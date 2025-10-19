import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const userBadgeSchema = z.object({
  user_id: z.string().min(1),
  badge_id: z.string().min(1),
});

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_badges')
    .select('user_id, badge_id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const body = await req.json();
  const parsed = userBadgeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid user_badges payload', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('user_badges')
    .insert([parsed.data])
    .select('user_id, badge_id')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
};
