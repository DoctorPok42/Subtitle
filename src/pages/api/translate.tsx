import { Configuration, OpenAIApi } from 'openai'
import SubtitleType from '../../../types/subtitle';
import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY as string,
})

const openai = new OpenAIApi(configuration)

export default async function translate(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { subtitles, lang } = JSON.parse(req.body)

        const transcription = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
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
        });

        const apiResponse = transcription.data.choices[0].message?.content

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
