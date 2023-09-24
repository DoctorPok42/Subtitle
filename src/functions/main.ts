import UploadVideo from "./uploadVideo";
import UploadLink from "./uploadLink";
import DeleteAudioFiles from "./delete";
import Transcription from "./transcription";
import { ButtonText, SubtitleType } from "../../types";

export default async function startProcess(
    file: File | null,
    link: string | null,
    setFile: (file: File | null) => void,
    setCanStart: (canStart: boolean) => void,
    setText: (text: ButtonText) => void,
    setSubtitle: (subtitle: SubtitleType[]) => void,
    setError: (errorMessage: string) => void,
    setIsFileOrLink: (isFileOrLink: 'file' | 'link' | null) => void,
    lang: string | undefined
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
                setText("Done!");
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
        setError('Something went wrong');
        setText("Error");
    } finally {
        setTimeout(() => {
            setText("Generate");
            setCanStart(true);
            setFile(null);
            setIsFileOrLink(null);
        }, 2000);
    }
}
