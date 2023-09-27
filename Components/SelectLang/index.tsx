import Select from "react-select";
import allLangs from "./langs";

import styles from "./styles.module.scss";

interface SelectLangProps  {
    setLang: (lang: string | undefined) => void;
    canStart: boolean;
    title: string;
}

const SelectLang = ({
    setLang,
    canStart,
    title
} : SelectLangProps) => {
    return (
        <div className={styles.selectLang}>
            <Select
                options={allLangs}
                placeholder={title}
                className={styles.select}
                isSearchable={true}
                onChange={(e) => setLang(e?.value)}
                isDisabled={!canStart}
            />
        </div>
    )
}

export default SelectLang;
