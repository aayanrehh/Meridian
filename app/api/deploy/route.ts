import { NextResponse } from "next/server";

type DeployPayload = {
  postId?: string;
  content?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as DeployPayload;

  return NextResponse.json({
    ok: true,
    postId: body.postId,
    scheduledFor: "9:14 AM",
    contentLength: body.content?.length ?? 0,
  });
}
