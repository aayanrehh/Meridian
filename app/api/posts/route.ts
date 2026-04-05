import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const clientId = process.env.JERAH_CLIENT_ID;

    if (!supabaseUrl || !supabaseKey || !clientId) {
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .eq("client_id", clientId)
      .eq("status", "draft")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      throw error;
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Posts GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
