import { PageHeader, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useContext, useState } from "react";
import { PlayerContext } from "../pages/_app";

export const Header = () => {
    const player = useContext(PlayerContext)

    let extra = [
        <Button key={1} type="link">
            <Link href={'/'}>На главную</Link>
        </Button>,
        <Button key={2}>
            <Link href={'/login'}>Авторизация</Link>
        </Button>,
        <Button key={3} type="primary">
            <Link href={'/registration'}>Регистрация</Link>
        </Button>
    ]

    if(player) {
        extra = [
            <Button key={1} type="link">
                <Link href={'/'}>На главную</Link>
            </Button>,
            <Button key={2}>
                <Link href={'/profile'}>{player.name}</Link>
            </Button>
        ]
    }

    return(
        <>
            <PageHeader
                className="site-page-header"
                title="Am League"
                subTitle="Футбол – это твой ритм жизни"
                extra={extra}
            >
            </PageHeader>
        </>
    )
}