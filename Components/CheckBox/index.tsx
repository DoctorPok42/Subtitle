import { Checkbox, FormControlLabel } from "@mui/material";

import styles from "./styles.module.scss";

interface CheckBoxProps {
    title: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({
    title,
    checked = false,
    onChange = () => { }
}: CheckBoxProps) => {
    return (
        <div className={styles.checkbox}>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} /> }
                label={title}
            />
        </div>
    )
}

export default CheckBox
