import { useState } from "react";
import { Link } from "react-router-dom";
import { AUTH_SUCCESS, instance } from "../../api/api";
import { AuthInput } from "../../components/auth/input/authInput";
import { useForm } from "../../hooks/useForm";
import styles from "./login.module.scss";

interface User {
  login: string;
  password: string;
}

export const LoginPage = (): React.ReactElement => {
  const [isFetching, setIsFetching] = useState<boolean>(false)


  const onSubmitSuccess = () => {
    setIsFetching(true)
    instance
      .post("/login", {
        login: data.login,
        password: data.password,
      })
      .then((res) => {
        if (res && res.status === AUTH_SUCCESS) {
          alert("Ура вы вошли успешно!")
        } else {
          alert("Логин или пароль не верны")
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
      <h1>Войти в аккаунт</h1>
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
          errors={errors.password}
          value={data.password}
          label={"Пароль"}
          type={'password'}
          name={"password"}
          placeholder={"password"}
          onChange={handleChange("password")}
        />

        <button disabled={isFetching} className={styles.form_submit} type="submit">
          Войти
        </button>

        <p>
        Еще нет аккаунта? &nbsp;
        <Link to={'/register'}>
          Зарегистрируйтесь
        </Link>
        </p>
      </form>
    </div>
  );
};
