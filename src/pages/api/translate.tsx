import SubtitleType from '../../../types/subtitle';
import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export default async function translate(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { subtitles, lang } = JSON.parse(req.body);

        const transcription = await groq.chat.completions.create({
            model: "llama2-70b-4096",
            messages: [
                {
                    role: "system",
                    content: `Translate the following subtitles to ${lang}`
                },
                {
                    role: "user",
                    content: subtitles.map((subtitle: SubtitleType) => subtitle.text).join('\n')
                }
            ]
        })

        const apiResponse = transcription.choices[0].message?.content || ""
        console.log(apiResponse)

        if (!apiResponse) {
            return res.status(500).json({ error: 'Something went wrong' });
        }

        const lines = apiResponse.trim().split('\n');

        const translatedSubtitles = [] as SubtitleType[];

        subtitles.forEach((subtitle: SubtitleType, index: number) => {
            translatedSubtitles.push({ ...subtitle, text: lines[index] });
        });

        return res.status(200).json({ translatedSubtitles });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
