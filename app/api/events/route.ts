import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const eventSchema = z
  .object({
    event_id: z.number().int().optional(),
    user_id: z.string().min(1).optional(),
  })
  .refine(
    (value) => value.event_id !== undefined || value.user_id !== undefined,
    { message: 'event_id or user_id is required' }
  );

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('events').select('event_id, user_id');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const body = await req.json();
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid event payload', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const payload = {
    ...(parsed.data.event_id !== undefined ? { event_id: parsed.data.event_id } : {}),
    ...(parsed.data.user_id ? { user_id: parsed.data.user_id } : {}),
  };

  const { data, error } = await supabase
    .from('events')
    .insert([payload])
    .select('event_id, user_id')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
};
