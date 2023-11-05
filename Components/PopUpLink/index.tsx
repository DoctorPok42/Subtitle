import { Button, IconButton } from '@mui/material';
import styles from './styles.module.scss'
import { Close, Send } from '@mui/icons-material/';
import { useState } from 'react';

interface PopUpLinkProps {
    setIsPopUpLinkOpen: (isPopLinkOpen: boolean) => void;
    setLink: (link: string) => void;
    link: string | null;
    setIsFileOrLink: (isFileOrLink: 'file' | 'link') => void;
}

const PopUpLink = ({ setIsPopUpLinkOpen, setLink, link, setIsFileOrLink }: PopUpLinkProps) => {
    const [tmpLink, setTmpLink] = useState<string>(link ? link : "");

    const handleAdd = () => {
        setIsFileOrLink('link')
        setIsPopUpLinkOpen(false)
        setLink(tmpLink)
    }

    return (
        <div className={styles.popupLink} onKeyUp={(e) => {
            if (e.key === "Escape") {
                setIsPopUpLinkOpen(false)
            }
        }}>
            <div className={styles.popupLink__content}>
                <div className={styles.popupLink__close}>
                    <IconButton>
                        <Close onClick={() => setIsPopUpLinkOpen(false)} />
                    </IconButton>
                </div>

                <div className={styles.popupLink__title}>
                    <h2>Add a video with a link</h2>
                </div>

                <div className={styles.popupLink__link} onKeyDown={
                    (e) => {
                        if (e.key === "Enter") {
                            handleAdd()
                        }
                    }
                }>
                    <input type="text" placeholder="Paste a link here" value={
                        tmpLink ? tmpLink : link ? link : ""
                    } onChange={(e) => setTmpLink(e.target.value)} />
                </div>

                <div className={styles.popupLink__button}>
                    <Button
                        className={styles.popupLink__button__button}
                        component="label"
                        variant="contained"
                        endIcon={<Send />}
                        onClick={() => handleAdd()}
                        disabled={!tmpLink}
                    >
                        Add link
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PopUpLink
