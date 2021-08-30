import { useState } from "react";
import { Link } from "react-router-dom";
import { AUTH_SUCCESS, instance } from "../../api/api";
import { AuthInput } from "../../components/auth/input/authInput";
import { useForm } from "../../hooks/useForm";
import { emailValidator } from "../../utils/auth";
import styles from "./register.module.scss";

interface User {
  login: string;
  password: string;
  email: string;
}

export const RegisterPage = (): React.ReactElement => {
  const [isFetching, setIsFetching] = useState<boolean>(false)


  const onSubmitSuccess = () => {
    setIsFetching(true)
    instance
      .post("/register", {
        login: data.login,
        password: data.password,
        email: data.email,
      })
      .then((res) => {
        if (res && res.status === AUTH_SUCCESS) {
          alert("Ура вы зарегистрировались успешно!")
        } else {
          alert("Логин, email или пароль не верны")
        }
      })
      .catch((e) => {
        alert("Что-то пошло не так")
      })
      .finally(()=>{
        setIsFetching(false)
      })
  };

  const { handleSubmit, handleChange, data, errors } = useForm<User>({
    validations: {
      login: {
        required: {
          value: true,
          message: "Это поле обязательно",
        },
        custom: {
          isValid: (value) => (value ? value.length > 4 : false),
          message: "Логин должен быть не менее 4х символов",
        },
      },
      email: {
        required: {
            value: true,
            message: "Это поле обязательно",
        },
        custom: {
            isValid: (value) => emailValidator(value),
            message: "Необходимо ввести валидный email"
        }
      },
      password: {
        required: {
          value: true,
          message: "Это поле обязательно",
        },
        custom: {
          isValid: (value) => (value ? value.length > 6 : false),
          message: "Пароль должен быть не менее 6-ти символов",
        },
      },
    },
    onSubmit: onSubmitSuccess,
  });

  return (
    <div className={styles.loginPage}>
      <h1>Зарегистрировать аккаунт</h1>
      <form onSubmit={handleSubmit}>
        <AuthInput
          errors={errors.login}
          value={data.login}
          label={"Логин"}
          name={"login"}
          placeholder={"login"}
          onChange={handleChange("login")}
        />
        <AuthInput
          errors={errors.email}
          value={data.email}
          label={"Email"}
          name={"email"}
          placeholder={"example@mail.com"}
          onChange={handleChange("email")}
        />
        <AuthInput
          errors={errors.password}
          value={data.password}
          label={"Пароль"}
          type={'password'}
          name={"password"}
          placeholder={"password"}
          onChange={handleChange("password")}
        />

        <button disabled={isFetching} className={styles.form_submit} type="submit">
          Зарегистрироваться
        </button>

        <p>
        Уже есть аккаунт? &nbsp;
        <Link to={'/login'}>
          Войдите
        </Link>
        </p>
      </form>
    </div>
  );
};
