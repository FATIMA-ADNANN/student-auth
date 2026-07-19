import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjmniearjnnxfzbdzzns.supabase.co";
const supabaseAnonKey = "sb_publishable_vfiBNGRUUEjE5xyv9pe00w_loy-mTtg";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);