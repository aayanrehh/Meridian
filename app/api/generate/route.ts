import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic } = body as { topic?: string };

    if (!topic?.trim()) {
      return NextResponse.json({ error: "Empty topic" }, { status: 400 });
    }

    const payload = {
      topic,
      clientId: process.env.JERAH_CLIENT_ID,
    };

    const webhookUrl = process.env.N8N_WEBHOOK_GENERATE_URL;
    if (!webhookUrl) {
      console.error("Missing N8N_WEBHOOK_GENERATE_URL in env");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    console.log(`Forwarding generate request for topic: "${topic}" to n8n...`);

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`n8n webhook failed with status ${res.status}`);
      return NextResponse.json(
        { error: "Generation failed down-pipe" },
        { status: res.status }
      );
    }

    const data = await res.json().catch(() => ({ ok: true }));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Generate route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
