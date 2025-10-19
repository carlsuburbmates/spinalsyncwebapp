import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('events').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const event = await req.json();
  const { data, error } = await supabase.from('events').insert([event]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
};
