import Upload from "./upload";
import Transcription from "./transcription";
import DeleteAudioFiles from "./delete";
import { ButtonText, SubtitleType } from "../../types";

export default async function startProcess(
    file: File,
    setFile: (file: File | null) => void,
    setCanStart: (canStart: boolean) => void,
    setText: (text: ButtonText) => void,
    setSubtitle: (subtitle: SubtitleType[]) => void,
    setError: (errorMessage: string) => void
    ) {

    try {
        setText("Uploading...");

        const uploadResponse = await Upload(file);

        if (uploadResponse.ok) {
            const { audioPath } = await uploadResponse.json();
            setText("Get subtitle...");

            const transcriptionResponse = await Transcription(audioPath);

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
        }
    } catch (error) {
        setError('Something went wrong');
        setText("Error");
    } finally {
        setTimeout(() => {
            setText("Generate");
            setCanStart(true);
            setFile(null);
        }, 2000);
    }
}
