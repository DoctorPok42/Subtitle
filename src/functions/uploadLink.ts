export default async function UploadLink(link: string) {
    return await fetch('/api/convertLink', {
        method: 'POST',
        body: JSON.stringify({ link }),
    })
}
