import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { Button, Form, Input } from 'antd'
import LoginCSS from "./login.module.css"
import { Header } from "../../components/Header"

export const Login = () => {
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
                localStorage.setItem('jwt', response.data.jwt)
                window.location.href = '/'
            } else {
                alert(`Что-то пошло не так. Попробуйте позже`)
            }
        })
    }
    return(
        <>
            <Header/>
            <div className="container">
                <div className={LoginCSS.content}>
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
                        onFinishFailed={() => {}}
                        autoComplete="on"
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
                        Вы еще не зарегистрированы? Переходите по этой <Link to="/registration">ссылке</Link>
                    </p>
                </div>
            </div>
        </>
    )
}