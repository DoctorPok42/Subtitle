import Select from "react-select";
import allLangs from "./langs";

import styles from "./styles.module.scss";

interface SelectLangProps  {
    setLang: (lang: string | undefined) => void;
}

const SelectLang = ({
    setLang
} : SelectLangProps) => {
    return (
        <div className={styles.selectLang}>
            <Select
                options={allLangs}
                placeholder="Select the language of the video"
                className={styles.select}
                isSearchable={true}
                onChange={(e) => setLang(e?.value)}
            />
        </div>
    )
}

export default SelectLang;
