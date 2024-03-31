import OpenAI from 'openai'
import fs from 'fs';
import SubtitleType from '../../../types/subtitle';

const openai = new OpenAI();

export default async function transcription(req: any, res: any) {
    try {
        const { audioPath, lang } = JSON.parse(req.body)

        const language = lang ?? 'en-US'

        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(audioPath),
          model: "whisper-1",
          response_format: "srt",
          language,
        }).catch((error) => {
          console.log('error', error)
        }) as any;

        const apiResponse = transcription;
        const lines = apiResponse.trim().split('\n');

        const subtitles = [] as SubtitleType[];

        for (let i = 0; i < lines.length; i += 4) {
            const id = parseInt(lines[i]);
            const date = lines[i + 1];
            const text = lines[i + 2];

            subtitles.push({ id, date, text });
        }

        return res.status(200).json({ subtitles });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
