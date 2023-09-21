import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import styles from './styles.module.scss'

interface UploadButtonProps {
    setFile: (file: File) => void;
    canStart: boolean;
}

const UploadButton = ({
    setFile,
    canStart
}: UploadButtonProps) => {
    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });

    return (
        <div className={styles.uploadButton}>
            <Button
                className={styles.uploadButton__imput}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onChange={(e: any) => setFile(e.target.files[0])}
                disabled={!canStart}
            >
                Upload file
                <VisuallyHiddenInput type="file" accept={
                    ".mp4, .mp3, .mpeg, .mpga, .m4a, .ogg, .wav, .webm, .flac"
                } />
            </Button>
        </div>
    )
}

export default UploadButton
