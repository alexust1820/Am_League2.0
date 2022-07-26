import MainContainer from "../../components/MainContainer"

const Registration = () => {
    const metadata = {
        title: "Регистрация",
        desc: "Am League - место встречи футбольных команд"
    }
    return(
        <MainContainer metadata={metadata}>
            <h1>Registration</h1>
        </MainContainer>
    )
}

export default Registration