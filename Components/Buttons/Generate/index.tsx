import { Button } from '@mui/joy';

import styles from './styles.module.scss'

interface GenerateButtonProps {
    file: File | null;
    handleStart: () => void;
    text: string;
}

const GenerateButton = ({
    file,
    handleStart,
    text
}: GenerateButtonProps) => {
    return (
    <div className={styles.generateButton} onClick={handleStart}>
        <Button
            disabled={!file}
            loading={text !== "Generate" && text !== "Done!"}
            loadingPosition="end"
            variant="solid"
            style={{
                cursor: !file ? "not-allowed !important" : "pointer",
            }}
        >
            {text}
        </Button>
    </div>
    )
}

export default GenerateButton
