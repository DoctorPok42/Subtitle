import UploadVideo from "./uploadVideo";
import UploadLink from "./uploadLink";
import DeleteAudioFiles from "./delete";
import Transcription from "./transcription";
import { ButtonText, SubtitleType } from "../../types";
import Translate from "./translate";

export default async function startProcess(
  file: File | null,
  link: string | null,
  setFile: (file: File | null) => void,
  setCanStart: (canStart: boolean) => void,
  setText: (text: ButtonText) => void,
  setSubtitle: (subtitle: SubtitleType[]) => void,
  setError: (errorMessage: string) => void,
  setIsFileOrLink: (isFileOrLink: "file" | "link" | null) => void,
  isTranslate: boolean,
  lang: string | undefined,
  langTranslate: string | undefined
) {
  try {
    setText("Uploading...");

    var uploadResponse;

    if (file) {
      uploadResponse = await UploadVideo(file);
    } else if (link) {
      uploadResponse = await UploadLink(link);
    } else {
      setError("No file or link provided");
      setText("Error");
      return;
    }

    if (uploadResponse.ok) {
      const { audioPath } = await uploadResponse.json();
      setText("Get subtitle...");

      const transcriptionResponse = await Transcription(audioPath, lang);

      DeleteAudioFiles(audioPath);

      if (transcriptionResponse.ok) {
        const { subtitles } = await transcriptionResponse.json();
        setSubtitle(subtitles);

        if (!isTranslate) return setText("Done!");

        setText("Translate...");
        const translate = await Translate(subtitles, langTranslate);

        if (translate.ok) {
          const { translatedSubtitles } = await translate.json();
          setSubtitle(translatedSubtitles);
          setText("Done!");
        } else {
          setError("Something went wrong");
          setText("Error");
          setCanStart(true);
          return;
        }
      } else {
        const errorMessage = await transcriptionResponse.json();
        setError(errorMessage);
        setText("Error");
      }
    } else {
      setError("Something went wrong");
      setText("Error");
      setCanStart(true);
    }
  } catch (error) {
    setError("Something went wrong");
    setText("Error");
  } finally {
    setTimeout(() => {
      setText("Generate");
      setCanStart(true);
    }, 2000);
  }
}
