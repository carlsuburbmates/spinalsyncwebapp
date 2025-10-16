import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 })
  }

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from("progress")
    .select("sub_module_id, score, completed_at")
    .eq("user_id", userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ progress: data ?? [] })
}

export async function POST(request: Request) {
  const { userId, subModuleId, score, completedAt } = await request.json()

  if (!userId || !subModuleId) {
    return NextResponse.json({ error: "userId and subModuleId are required" }, { status: 400 })
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase
    .from("progress")
    .upsert(
      {
        user_id: userId,
        sub_module_id: subModuleId,
        score,
        completed_at: completedAt ?? new Date().toISOString(),
      },
      { onConflict: "user_id,sub_module_id" },
    )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
