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
                isSearchable={true}
                onChange={(e) => setLang(e?.value)}
                isDisabled={!canStart}
                styles={{
                    indicatorSeparator(base) {
                        return {
                            ...base,
                            display: "none",
                        };
                    },

                    dropdownIndicator(base, state) {
                        return {
                            ...base,
                            color: "var(--blue)",
                            transition: "all .2s ease",
                            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "",
                        };
                    },

                    control(base) {
                        return {
                            ...base,
                            cursor: "pointer",
                        };
                    },

                    menu(base) {
                        return {
                            ...base,
                            borderRadius: "0 0 10px 10px",
                        };
                    },
                    option(base, state) {
                        return {
                            ...base,
                            backgroundColor: state.isFocused ? "rgba(32, 148, 243, 0.4)" : "var(--white)",
                            color: "var(--black)",
                            cursor: "pointer",
                        }
                    },

                    container(base) {
                        return {
                            ...base,
                            width: "22em",
                        }
                    },

                    input(base) {
                        return {
                            ...base,
                            color: "var(--blue)",
                            borderRadius: "10px 10px 0 0",
                        }
                    },

                    noOptionsMessage(base) {
                        return {
                            ...base,
                            color: "var(--blue)",
                        }
                    },
                }}
            />
        </div>
    )
}

export default SelectLang;
