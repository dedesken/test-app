import styles from './noMatch.module.scss'

export const NoMatch = (): React.ReactElement => {
    return <div className={styles.noMatch}>
        <h2>404</h2>
        <p>Ууууу, ай-яй-яй сюда заходить вы не должны.</p>
    </div>
}