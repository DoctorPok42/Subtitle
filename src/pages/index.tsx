import Head from 'next/head'
import { UploadButton, GenerateButton, Subtitle, PopUpLink, SelectLang, CheckBox } from '../../Components'
import { useState } from 'react'
import { Alert } from '@mui/material'
import { SubtitleType, ButtonText } from '../../types'
import startProcess from '@/functions/main'

const Home = () => {
  const [file, setFile] = useState<File | null>(null)
  const [link, setLink] = useState<string |null>(null);
  const [text, setText] = useState<ButtonText>("Generate")
  const [canStart, setCanStart] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [subTitle, setSubTitle] = useState<SubtitleType[] | null>(null)
  const [isPopUpLinkOpen, setIsPopUpLinkOpen] = useState<boolean>(false);
  const [isFileOrLink, setIsFileOrLink] = useState<'file' | 'link' | null>(null);
  const [lang, setLang] = useState<string | undefined>(undefined);
  const [isTranslate, setIsTranslate] = useState<boolean>(false);
  const [langTranslate, setLangTranslate] = useState<string | undefined>(undefined);

  const handleStart = async () => {
    if (!canStart) return

    if (file || link) {
      setCanStart(false)
      setSubTitle(null)
      setError(null)

      startProcess(
        file,
        link,
        setFile,
        setCanStart,
        setText,
        setSubTitle,
        setError,
        setIsFileOrLink,
        isTranslate,
        lang,
        langTranslate
      )
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
        {isPopUpLinkOpen && <PopUpLink
          setIsPopUpLinkOpen={setIsPopUpLinkOpen}
          setLink={setLink}
          link={link}
          setIsFileOrLink={setIsFileOrLink}
        />}

        {error && <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        }

        <UploadButton
          setFile={setFile}
          canStart={canStart}
          setIsPopUpLinkOpen={setIsPopUpLinkOpen}
          setIsFileOrLink={setIsFileOrLink}
          isFileOrLink={isFileOrLink}
        />

        <SelectLang setLang={setLang} canStart={canStart} title="Select the language of the video" />

        <CheckBox
          title="Translate in another language"
          checked={isTranslate}
          onChange={() => setIsTranslate(!isTranslate)}
        />

        {
          isTranslate &&
          <SelectLang setLang={setLangTranslate} canStart={canStart} title='Select the language of the translation' />
        }

        <GenerateButton file={file} link={link} handleStart={handleStart} text={text} />

        {subTitle && <Subtitle subTitle={subTitle} /> }
      </main>
    </>
  )
}

export default Home
