import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const SUPABASE_URL = "https://wxtzvhobhvczzejbtxrx.supabase.co";
export const SUPABASE_KEY = "sb_publishable_cnqR6qJnTGRrLFl_p2gl7Q_Km_hCXXo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
