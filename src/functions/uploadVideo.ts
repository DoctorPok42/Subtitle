export default async function UploadVideo(file: File) {
    const formData = new FormData();
    formData.append('videoPath', file);

    return await fetch('/api/convert', {
        method: 'POST',
        body: formData
    })
}
