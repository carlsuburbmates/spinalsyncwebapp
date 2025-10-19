
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js"

function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase server credentials are not configured")
  }

  return createSupabaseJsClient(supabaseUrl, serviceRoleKey)
}

export { createSupabaseServerClient, createSupabaseServerClient as createClient };
