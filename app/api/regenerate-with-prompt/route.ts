import { NextResponse } from "next/server";

type RegenerateWithPromptPayload = {
  postContent?: string;
  userInstruction?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as RegenerateWithPromptPayload;
  const postContent = body.postContent?.trim() ?? "";
  const userInstruction = body.userInstruction?.trim() ?? "";

  const updatedPost = `${postContent}

--
Twin refinement applied: ${userInstruction || "Adjusted for sharper strategic contrast and tighter cadence."}`;

  return NextResponse.json({ updatedPost });
}
