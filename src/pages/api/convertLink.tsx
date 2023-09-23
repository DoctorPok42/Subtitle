import { promisify } from 'util';
import { exec } from 'child_process';
import axios from 'axios';
import fs from 'fs';

const execPromise = promisify(exec);

export default async function convertLink(req: any, res: any) {
    try {
        const { link } = JSON.parse(req.body);

        const response = await axios.get(link, { responseType: 'arraybuffer' });

        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const filePath = `./public/videos/${randomString}`;

        await fs.writeFileSync(filePath, Buffer.from(response.data))

        await execPromise(`ffmpeg -i ${filePath} -q:a 0 ./public/videos/${randomString}.mp3`)
            .catch(() => {
                fs.unlink(filePath, (err: any) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Something went wrong' });
                    }
                });
                return res.status(500).json({ error: 'Please upload a valid video file with sound.' });
            });

        return res.status(200).json({ audioPath: `./public/videos/${randomString}.mp3` });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
