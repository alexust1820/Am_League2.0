import React from "react"
import {Typography} from "antd"
import {Link} from "react-router-dom"
import {Header} from "../../components/Header"

export const NotFound = () => {
    return(
        <>
            <Header/>
            <div className="container">
                <Typography.Title level={2}>
                        Такой страницы не существует, сорри...
                </Typography.Title>
                <Link to="/">На главную</Link>
            </div>
        </>
    )
}