import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  return <div className={ styles.container }>

      <Head>
        <title>You can do it!</title>
        <meta name="description" content="Go ahead! You can do it!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ styles.main }>
        <h1 className={ styles.title }>
          You can do it!
        </h1>

        <p className={ styles.description }>
          There's so much to do! I believe in you!
        </p>

        <div className={ styles.grid }>
          <a href="https://nextjs.org/docs" className={ styles.card }>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>

      </main>

      <footer className={ styles.footer }>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={ styles.logo }>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>

    </div>;

}
