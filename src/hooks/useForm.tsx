import { ChangeEvent, FormEvent, useState } from "react"

/**
 * Интерфейс валидации формы
 */

interface Validation {
    required?: {
      value: boolean
      message: string
    }
    pattern?: {
      value: string
      message: string
    }
    custom?: {
      isValid: (value: string) => boolean
      message: string
    }
}
/**
 * Тип объекта валидации
 */
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>
/**
 * Тип объекта ошибок формы
 */
type ErrorRecord<T> = Partial<Record<keyof T, string>>


/**
 * Хук взаимодействия с формами, при инициализации требуется задать тип инстанса формы:
 * \<SomeType>useForm(optionsObject)
 * @param   {<object>} options Объект настроек формы содержит следующие параметры:
 * @param              options.initialValues Начальные значения данных формы, должны соответствовать ключам \<SomeType>
 * @param   {<function>} options.onSubmit Функция коллбек срабатывает после прохождения валидации формы
 * @param   {<object>} options.validations Объект валидации формы, содержит пару ключ-значение:
 * @param   {<object>} options.validations.pattern Паттерн regex валидации поля формы, 
 * доложен содержать ключ value значение которого соответсвует regex
 * @param   {<object>} options.validations.custom Кастомный валидатор, должен содержать метод isValid возвращающий булевое значение
 * @param   {<object>} options.validations.required Объект со знаечнием value сообщает хуку о том является ли поле обязательным
 * @return {<object>} Хук возвращает объект со значениями полей формы - data.someKey, 
 * ошибок - errors.someKey, 
 * коллбек для события изменения инпута - handleChange('someKey'), 
 * коллбек для отправки данных формы - handleSubmit
 */
export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
    initialValues?: Partial<T>
    onSubmit?: () => void
    validations?: Validations<T>
}) => {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T)
    const [errors, setErrors] = useState<ErrorRecord<T>>({})

    const handleChange = <S extends unknown>(
        key: keyof T, 
        sanitizeFn?: (value: string) => S 
    ) => (e: ChangeEvent<HTMLInputElement>): void => {
        const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value
        setData({
            ...data,
            [key]: value,
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const validations = options?.validations

        if (validations) {
            let valid = true
            const newErrors = {} as ErrorRecord<T>
            for (const key in validations) {
              const value = data[key]
              const validation = validations[key]
      
              const pattern = validation?.pattern
              if (pattern?.value && !RegExp(pattern.value).test(value)) {
                valid = false
                newErrors[key] = pattern.message
              }
      
              const custom = validation?.custom
              if (custom?.isValid && !custom.isValid(value)) {
                valid = false
                newErrors[key] = custom.message
              }

              if (validation?.required?.value && !value) {
                valid = false
                newErrors[key] = validation?.required?.message
              }
            }
      
            if (!valid) {
              setErrors(newErrors)
              return
            }
          }
      
          setErrors({})

        if (options?.onSubmit) {
            options.onSubmit()
        }
    }

    return {
        data,
        handleChange,
        handleSubmit,
        errors
    }
}