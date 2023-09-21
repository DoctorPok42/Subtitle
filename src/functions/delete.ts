export default async function DeleteAudioFiles(audioPath: string) {
    return await fetch('/api/deleteAudio', {
        method: 'POST',
        body: JSON.stringify({ audioPath }),
    })
}
