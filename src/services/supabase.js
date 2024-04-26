import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ehkzfbcnwcykcbdhupaa.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoa3pmYmNud2N5a2NiZGh1cGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMzk0MDEsImV4cCI6MjAyOTcxNTQwMX0.pITIWZHBtL3huS6T0jrrOheW4beDuJilqYzX4kH8Z4o';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
