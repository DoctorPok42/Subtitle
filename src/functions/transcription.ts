export default async function Transcription(audioPath: string, lang: string | undefined) {
    const formData = new FormData();
    formData.append('audioPath', audioPath);

    return await fetch('/api/transcription', {
        method: 'POST',
        body: JSON.stringify({ audioPath, lang }),
    })
}
