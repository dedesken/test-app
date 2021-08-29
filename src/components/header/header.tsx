import styles from './header.module.scss'

export const Header = (): React.ReactElement => {
    return (
        <header className={styles.header}>
            <p>
                JS
            </p>
        </header>
    )
}