import { createHmac } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postId, content } = body as { postId?: string; content?: string };

    if (!content?.trim()) {
      return NextResponse.json({ error: "Empty content" }, { status: 400 });
    }

    // Generate idempotency key based on postId or hash of content
    const secret = process.env.N8N_DEPLOY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing N8N_DEPLOY_WEBHOOK_SECRET in env");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const idempotencyKey = createHmac("sha256", secret)
      .update(postId ?? content.slice(0, 64))
      .digest("hex");

    // Include the client ID in the payload for n8n multi-tenancy lookup
    const payload = {
      postId,
      content,
      idempotencyKey,
      clientId: process.env.JERAH_CLIENT_ID,
    };

    // Calculate HMAC signature of the payload to prove it came from Next.js
    const signature = createHmac("sha256", secret)
      .update(JSON.stringify(payload))
      .digest("hex");

    const webhookUrl = process.env.N8N_WEBHOOK_DEPLOY_URL;
    if (!webhookUrl) {
      console.error("Missing N8N_WEBHOOK_DEPLOY_URL in env");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    console.log(`Forwarding deploy request for ${postId} to n8n...`);

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Meridian-Signature": signature,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`n8n webhook failed with status ${res.status}`);
      return NextResponse.json(
        { error: "Deployment failed down-pipe" },
        { status: res.status }
      );
    }

    const data = await res.json().catch(() => ({ ok: true }));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Deploy route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
