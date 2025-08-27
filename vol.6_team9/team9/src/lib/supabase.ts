import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.mata.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.mata.env.VITE_SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
