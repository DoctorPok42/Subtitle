import { Button } from '@mui/joy';

import styles from './styles.module.scss'

interface GenerateButtonProps {
    file: File | null;
    link: string | null;
    handleStart: () => void;
    text: string;
}

const GenerateButton = ({
    file,
    link,
    handleStart,
    text
}: GenerateButtonProps) => {
    return (
    <div className={styles.generateButton} onClick={handleStart}>
        <Button
            disabled={!file && !link}
            loading={text !== "Generate" && text !== "Done!" && text !== "Error"}
            loadingPosition="end"
            variant="solid"
        >
            {text}
        </Button>
    </div>
    )
}

export default GenerateButton
