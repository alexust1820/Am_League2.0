import 'antd/dist/antd.css'
import '../styles/style.css'
import '../styles/container.css'
import { createContext } from 'react'
import nextCookie from "next-cookies"
import axios from 'axios'

export const PlayerContext = createContext()

export default function MyApp({ Component, pageProps, player }) {
  return(<>
        <PlayerContext.Provider value={player}>
          <Component {...pageProps} />
        </PlayerContext.Provider>
  </>)
}

MyApp.getInitialProps = async ({ctx}) => {
  const { token } = nextCookie(ctx)
  const url = "http://localhost:8080/user-params"
  let player = null

  if(token) {
    player = await axios({
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(async res => {
      return await res.data
    }).catch(err => {})
  }

  return {
    player
  }

}