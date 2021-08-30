import { ChangeEvent } from "react"
import styles from './authInput.module.scss'


 /** Пропсы компонента AuthInput
  * @param label лейбл инпута
  * @param name идентификатор инпута
  * @param placeholder плейсхолдер инпута
  * @param value значения инпута
  * @param type тип инпута по дефолту text
  * @param onChange коллбек события изменения инпута
  * @param errors ошибки в инпуте
  */
 interface AuthInputProps {
    label?: string
    errors?: string

    name?: string
    placeholder?: string
    value?: string
    type?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AuthInput = ({errors, label, name, placeholder, value, type = 'text', onChange,} : AuthInputProps): React.ReactElement => {
    return (
        <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
                <label htmlFor={name}>
                    {label || ''}
                </label>
                <input type={type} id={name} placeholder={placeholder || ''} value={value || ''} onChange={onChange}/>
            </div>
            {errors && <p className={styles.input__error}>{errors}</p>}
        </div>
    )
}