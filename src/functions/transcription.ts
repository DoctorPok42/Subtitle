export default async function Transcription(audioPath: string) {
    const formData = new FormData();
    formData.append('audioPath', audioPath);

    return await fetch('/api/transcription', {
        method: 'POST',
        body: JSON.stringify({ audioPath }),
    })
}
