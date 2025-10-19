import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const profileSchema = z.object({
  user_id: z.string().min(1),
});

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('user_id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const body = await req.json();
  const parsed = profileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid profile payload', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert([parsed.data])
    .select('user_id')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
};
