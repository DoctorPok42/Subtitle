export default async function Upload(file: File) {
    const formData = new FormData();
    formData.append('videoPath', file);

    return await fetch('/api/convert', {
        method: 'POST',
        body: formData
    })
}
