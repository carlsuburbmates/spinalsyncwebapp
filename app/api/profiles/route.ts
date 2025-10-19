import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const profile = await req.json();
  const { data, error } = await supabase.from('profiles').insert([profile]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
};
