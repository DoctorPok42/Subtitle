import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteAudio(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { audioPath } = JSON.parse(req.body);

        fs.unlinkSync(audioPath);

        const tmpPath = audioPath.replace('.mp3', '');
        fs.unlinkSync(tmpPath);

        return res.status(200).json({ message: 'Audio deleted' });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
