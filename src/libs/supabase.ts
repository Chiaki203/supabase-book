import {createClient} from '@supabase/supabase-js'
import {Title} from 'src/components/TitleList'

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

export const getSubtitles = async(id:string) => {
  let {data, error} = await client
    .from('manga-title')
    .select('*')
    .eq('id', id)
  // console.log(data)
  // return
  // if (!error && data) {
  if (data) {
    const title = data[0];
    // const {title} = data;
    ({data, error} = await client
      .from('manga-subtitle')
      .select('*')
      .order('volume', {ascending: true})
      .eq('title_id', id))
    if (!error && data) {
      return {title: title, subtitles: data}
    } else {
      return {title: title, subtitles: null}
    }
  }
  return {title: null, subtitles: null}
}

export const getProfile = async() => {
  const {data, error} = await client.from('profile').select('*');
  if (!error && data) {
    return data[0];
  }
  return null;
}