import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Auth} from '@supabase/ui'
import {useCallback, useEffect, useState} from 'react'
import {Title, TitleList} from 'src/components/TitleList'
import {getTitles} from 'src/libs/supabase'

const Home: NextPage = () => {
  const {user} = Auth.useUser()
  // console.log(user)
  const [text, setText] = useState<string>('')
  const [titles, setTitles] = useState<Title[]>([])
  const getTitleList = useCallback(async() => {
    const data = await getTitles()
    setTitles(data)
  }, [setTitles])
  useEffect(() => {
    getTitleList()
  }, [getTitleList])
  return (
    <div>
      <div className="flex justify-center gap-2 p-4">
        <input
          className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
          placeholder="Filter Text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      {user && (
        <TitleList
          titles={titles}
          uuid={user.id}
          getTitleList={getTitleList}
          filterText={text}
        />
      )}
    </div>
  )
}

export default Home
