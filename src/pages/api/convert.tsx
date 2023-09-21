import { promisify } from 'util';
import { exec } from 'child_process';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ dest: './public/videos/' });
const execPromise = promisify(exec);

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function convert(req: any, res: any) {
    try {
        upload.single('videoPath')(req, res, async (err: any) => {
            if (err) {
                res.status(500).json({ error: 'Something went wrong' });
            }

        const path = req.file.path;

        await execPromise(`ffmpeg -i ${path} -q:a 0 ./public/videos/${path.split('\\')[2].split('.')[0]}.mp3`)
            .catch(() => {
                fs.unlink(path, (err: any) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Something went wrong' });
                    }
                });
                return res.status(500).json({ error: 'Please upload a valid video file with sound.' });
            });

        return res.status(200).json({ audioPath: `./public/videos/${path.split('\\')[2].split('.')[0]}.mp3` });

        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
