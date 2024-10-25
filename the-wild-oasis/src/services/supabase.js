import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qhpezdlwwttucouzzkmy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFocGV6ZGx3d3R0dWNvdXp6a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxODA0NzYsImV4cCI6MjA0NDc1NjQ3Nn0.-DKoyEvmVzwRhXgBHU6O6qmgaYCM89fizRmXT3Z8dG8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
