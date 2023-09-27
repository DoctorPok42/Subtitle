import { SubtitleType } from "../../types";

export default async function Translate(subtitles: SubtitleType[], lang: string | undefined) {
    return await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({ subtitles, lang }),
    })
}
