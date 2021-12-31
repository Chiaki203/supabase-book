import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!SUPABASE_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_KEY')
}

export const client = createClient(SUPABASE_URL, SUPABASE_KEY)

// console.log(client)

export const getTitles = async() => {
  const {data, error} = await client
    .from('manga-title')
    .select('*')
    .order('title');
  if (!error && data) {
    return data
  }
  return [];
}