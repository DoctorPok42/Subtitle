import { Button, ButtonGroup } from "@mui/material";
import { CloudUpload, AddLink } from '@mui/icons-material/';
import { styled } from '@mui/material/styles';
import styles from './styles.module.scss'
import { useState } from "react";

interface UploadButtonProps {
    setFile: (file: File) => void;
    canStart: boolean;
    setIsPopUpLinkOpen: (isPopLinkOpen: boolean) => void;
    setIsFileOrLink: (isFileOrLink: 'file' | 'link') => void;
    isFileOrLink: 'file' | 'link' | null;
}

const UploadButton = ({
    setFile,
    canStart,
    setIsPopUpLinkOpen,
    setIsFileOrLink,
    isFileOrLink
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
            <ButtonGroup
                variant="contained"
            >
                <Button
                    className={styles.uploadButton__imput}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    onClick={() => setIsFileOrLink('file')}
                    onChange={(e: any) => setFile(e.target.files[0])}
                    disabled={!canStart}
                    style={{
                        backgroundColor: isFileOrLink === 'file' ? 'var(--blue)' : 'var(--white)',
                        color: isFileOrLink === 'file' ? 'var(--white)' : 'var(--blue)',
                        border: isFileOrLink === 'file' ? '1px solid var(--blue)' : '1px solid var(--grey-light)'
                    }}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" accept={
                        ".mp4, .mp3, .mpeg, .mpga, .m4a, .ogg, .wav, .webm, .flac"
                    } />
                </Button>

                <Button
                    className={styles.uploadButton__imput}
                    component="label"
                    variant="contained"
                    endIcon={<AddLink />}
                    onClick={() => setIsPopUpLinkOpen(true)}
                    disabled={!canStart}
                    style={{
                        backgroundColor: isFileOrLink === 'link' ? 'var(--blue)' : 'var(--white)',
                        color: isFileOrLink === 'link' ? 'var(--white)' : 'var(--blue)',
                        border: isFileOrLink === 'link' ? '1px solid var(--blue)' : '1px solid var(--grey-light)'
                    }}
                >
                    Add link
                </Button>
        </ButtonGroup>
        </div>
    )
}

export default UploadButton
