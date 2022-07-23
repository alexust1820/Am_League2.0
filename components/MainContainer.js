import Head from "next/head"
import { Header } from "./Header"

const MainContainer = ({children, metadata}) => {
    console.log(metadata)
    return(
        <>
            <Head>
                <title>{metadata.title}</title>
            </Head>
            <Header/>
            {children}
        </>
    )
}

export default MainContainer