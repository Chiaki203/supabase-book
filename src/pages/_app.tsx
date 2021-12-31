import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import {Auth} from '@supabase/ui'
import {AuthLayout} from 'src/layout/AuthLayout'
import {client} from 'src/libs/supabase'

function MyApp({ Component, pageProps }: AppProps) {
  console.log('hi')
  const {user} = Auth.useUser();
  console.log(user)
  return (
    <Auth.UserContextProvider supabaseClient={client}>
      <AuthLayout>
        <Component {...pageProps}/>
      </AuthLayout>
    </Auth.UserContextProvider>
  )
}

export default MyApp
