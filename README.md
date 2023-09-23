<div align="center">
    <img src="public/favicon.ico" width="30%">
</div>

# Subtitle

### Create a subtitle for your video in a few clicks

## Installation

1. Clone the repository

```bash
git git@github.com:DoctorPok42/Subtitle.git
```

2. Install dependencies

```bash
npm install
```

3. Add .env file

```bash
touch .env
```

4. Add the following variables to the .env file

```bash
OPENAI_API_KEY= # Your OpenAI API key
```

5. Run the project

```bash
npm run dev
```

## Usage

1. Go to http://localhost:3000

2. Upload your video file or paste the link to your video

3. Click on the "Generate" button

4. Wait for the subtitle to be generated

5. It's done!

## Sources Accepeted

### Input

| Extension | Supported |
| --------- | --------- |
| .mp4      | ✅       |
| .mp3      | ✅       |
| .mpeg      | ✅       |
| .mpga      | ✅       |
| .m4a      | ✅       |
| .ogg      | ✅       |
| .wav      | ✅       |
| .webm      | ✅       |
| .flac      | ✅       |


### Output

| Format | Extension | Supported |
| ------ | --------- | --------- |
| YIFY   | .srt      | ✅       |

## Tech

- [OpenAI](https://openai.com/)
- [Next.js](https://nextjs.org/)
- [FFmpeg](https://ffmpeg.org/)
- [Multer](https://www.npmjs.com/package/multer)
- [Axios](https://www.npmjs.com/package/axios)
- [TS](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Material UI](https://material-ui.com/)

## Folder structure

- **components** - Contains all the components used in the project
- **pages** - Contains all the pages used in the project
- **public** - Contains all the static files used in the project
- **styles** - Contains all the styles used in the project
- **api** - Contains all the routes api used in the project

## License

[MIT](https://github.com/DoctorPok42/Subtitle/blob/main/LICENSE)
