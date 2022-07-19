import React from "react"
import axios from "axios"
import { Button, Form, Input } from 'antd'
import {Link} from "react-router-dom"
import RegCSS from "./reg.module.css"
import { Header } from "../../components/Header"

export const Registration = () => {
    document.title = 'Регистрация'

    const OnFinish = (e) => {
        const url = "http://localhost:8080/registration"
        axios.post(url, {
            name: e.name,
            surname: e.surname,
            email: e.email,
            password: e.password
        }).then(response => {
            const code = response.data.code
            if(code === 401) {
                alert(`На данную почту уже зарегистрирован аккаунт`)
            } else if (code === 202) {
                alert(`Регистрация прошла успешно`)
                localStorage.setItem('jwt', response.data.jwt)
                window.location.href = '/'
            } else if (code === 204) {
                alert(`Введите все данные правильно`)
            }
        })
    }

    return(
        <>
        <Header/>
            <div className="container">
                <div className={RegCSS.content}>
                    <Form
                        name="Registration"
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
                            label="Имя"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите свое имя!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Фамилия"
                            name="surname"
                            rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите свою фамилию!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
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
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </Form>   
                    <p className={RegCSS.isReg}>
                        Уже зарегистрированы? Переходите по этой <Link to="/login">ссылке</Link>
                    </p> 
                </div>   
            </div>    
        </>
    )
}