import Head from 'next/head'
import { UploadButton, GenerateButton, Subtitle } from '../../Components'
import { useState } from 'react'
import { Alert } from '@mui/material'
import { SubtitleType, ButtonText } from '../../types'
import startProcess from '@/functions/main'

const Home = () => {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState<ButtonText>("Generate")
  const [canStart, setCanStart] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [subTitle, setSubTitle] = useState<SubtitleType[] | null>(null)

  const handleStart = async () => {
    if (!canStart) return

    if (file) {
      setCanStart(false)
      setSubTitle(null)

      startProcess(file, setFile, setCanStart, setText, setSubTitle, setError)
    }
  }

  return (
    <>
      <Head>
        <title>Subtitle</title>
        <meta name="description" content="Convert video to subtitle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        {error && <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        }

        <UploadButton setFile={setFile} canStart={canStart} />
        <GenerateButton file={file} handleStart={handleStart} text={text} />

        {subTitle && <Subtitle subTitle={subTitle} /> }

      </main>
    </>
  )
}

export default Home
