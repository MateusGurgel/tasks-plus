import styles from "./styles.module.css"
import Head from 'next/head'

export default function Dashboard(){
    return(
    <div className={styles.container}>
        <Head>
            <title>Dashboard</title>
        </Head>

        <h1>Dashboard</h1>
    </div>
    )
}