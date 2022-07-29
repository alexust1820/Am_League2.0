import Head from "next/head"
import jsCookie from 'js-cookie'
import { Header } from "./Header"

const MainContainer = ({children, metadata}) => {
    return(
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.desc} />
            </Head>
            <Header/>
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default MainContainer