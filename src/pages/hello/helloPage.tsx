import { Link } from "react-router-dom"
import styles from './helloPage.module.scss'

export const HelloPage = (): React.ReactElement => {
    return (
        <div className={styles.helloPage}>
            <h2>
                Привет, это тестовая работа.
            </h2>
            <h3>
                Тут ты можешь зарегистрироваться <br/> или войти в аккаунт.
            </h3>
            <div className={styles.links}>
                <Link to={'/login'}>Войти</Link>
                <Link to={'/register'}>Зарегистрироваться</Link>
            </div>
        </div>
    )
} 