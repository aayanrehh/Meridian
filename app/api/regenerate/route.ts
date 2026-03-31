import { NextResponse } from "next/server";

type RegeneratePayload = {
  postId?: string;
  source?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as RegeneratePayload;
  const source = body.source ?? "Harvard Business Review · 2h ago";

  const updatedPost = `A lot of people confuse confidence with readiness. Leadership readiness is repetition under pressure.

In higher-ed and in executive teams, the differentiator is the same: who can absorb difficult feedback, rerun the play with precision, and produce measurable improvement by the next cycle.

If you are developing first-time leaders, train behaviors you can audit:
- response quality under constraint,
- decision clarity with incomplete information,
- consistency in follow-through.

The strongest talent pipelines are built on standards, not slogans.

Source context: ${source}`;

  return NextResponse.json({ postId: body.postId, updatedPost });
}
