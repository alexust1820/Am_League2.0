import jsCookie from 'js-cookie'
import { Button, Form, Input, Typography } from 'antd'
import axios from "axios"
import Link from 'next/link'
import MainContainer from "../../components/MainContainer"
import LoginCSS from './login.module.css'
import Router from 'next/dist/server/router'

const Login = () => {

    const metadata = {
        title: "Авторизация",
        desc: "Am League - место встречи футбольных команд"
    }

    function OnFinish(e) {
        const url = "http://localhost:8080/login"
        axios.post(url, {
            email: e.email,
            password: e.password
        }).then(response => {
            const code = response.data.code
            if (code === 403) {
                alert(`Проверьте поля формы`)
            } else if (code === 202) {
                alert(`Вы авторизированы`)
                jsCookie.set('token', response.data.jwt)
                
            } else {
                alert(`Что-то пошло не так. Попробуйте позже`)
            }
        })
    }

    return(
        <MainContainer metadata={metadata}>
            <div className={LoginCSS.content}>
                <Typography.Title 
                    level={3}
                    className={LoginCSS.title}>
                    Скорее авторизируйтесь для завоевания новых вершин
                </Typography.Title>

                <Form
                    name="Login"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={OnFinish}
                    autoComplete="on"
                    className={LoginCSS.form}
                    >
                    <Form.Item
                        label="Электронная почта"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свою электронную почту!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свой пароль!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Авторизироваться
                        </Button>
                    </Form.Item>
                </Form>
                <p className={LoginCSS.isReg}>
                    Вы еще не зарегистрированы? Переходите по этой <Link href={'/registration'}>ссылке</Link> 
                </p>
            </div>
        </MainContainer>
    )
}

export default Login