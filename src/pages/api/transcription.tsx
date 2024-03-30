import { Configuration, OpenAIApi } from 'openai'
import fs from 'fs';
import SubtitleType from '../../../types/subtitle';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY as string,
})

const openai = new OpenAIApi(configuration)

const WHISPER_MODEL = 'whisper-1'

export default async function transcription(req: any, res: any) {
    try {
        const { audioPath, lang } = JSON.parse(req.body)

        const language = lang ? lang : 'en-US'
        const response_format = 'srt'

        const transcription = await openai.createTranscription(
            WHISPER_MODEL as any,
            language,
            response_format
        );

        const apiResponse = transcription.data as any;

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
