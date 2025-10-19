import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const badgeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['Foundation', 'Advanced', 'Master', 'Special']),
  criteria: z.string().min(1),
  icon: z.string().min(1),
});

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('badges')
    .select('id, name, description, category, criteria, icon');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const body = await req.json();
  const parsed = badgeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid badge payload', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('badges')
    .insert([parsed.data])
    .select('id, name, description, category, criteria, icon')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
};
