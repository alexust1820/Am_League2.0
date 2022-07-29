import { Button, Typography, Form, Input, Select } from "antd"
import { useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import axios from "axios"
import { invitePlayerURL } from "../../clientConfig.js"
import InviteCSS from "./invite.module.css"

const { Option } = Select

export const InvitePage = () => {
    document.title = 'Приглашение в команду'
    const params = useParams()

    const positions = [
        'Не определен',
        'Вратать',
        'Защитник',
        'Полузащитник',
        'Нападающий'
    ]

    const OnFinish = (e) => {
        if(Number(params.isNew)) {
            axios.post(invitePlayerURL, {
                name: e.name,
                surname: e.surname,
                email: params.email,
                password: e.password,
                position_id: e.position_id,
                team_id: Number(params.team_id),
                isNew: true
             }).then((res) => {
                console.log(res.data)
                const createResultCode = res.data.createResult.code
                const addResultCode = res.data.addResult.code
                if (addResultCode === 202 & createResultCode === 202) {
                    alert(`Отлично! Вы создали аккаунт и добавились в команду ${params.team_name}`)
                    localStorage.setItem('jwt', res.data.createResult.jwt)
                    window.location.href = '/'
                }
                if (addResultCode === 208) {
                    alert(`Вы уже присудствуете в команде. Вам не нужно создавать аккаунт и добавляться в команду`)
                }
                if (createResultCode === 401) {
                    alert(`На данную почту уже зарегистрирован аккаунт`)
                } 
                if (!createResultCode && !addResultCode) {
                    alert(`Что-то пошло не так. Попробуйте позже`)
                }
            })
        } else {
            axios.post(invitePlayerURL, {
                team_id: Number(params.team_id),
                email: params.email,
                isNew: false
             }).then((res) => {
                const addResultCode = res.data.code
                console.log(res)
                if(addResultCode === 404) {
                    alert(`Вы не зарегистрированы на сайте. Для добавления в команду необходимо быть зарегистрированным`)
                } else if (addResultCode === 208) {
                    alert(`Вы уже присудствуете в команде`)
                } else if (addResultCode === 202) {
                    alert(`Отлично! Вы добавились в команду ${params.team_name}`)
                    window.location.href = '/'
                } else {

                }
             })
        }
    }

    if(Number(params.isNew)) {
        return(
            <>
                <Header/>
                <div className="container">
                    <div className={InviteCSS.content}>
                        <Typography.Title level={5} className={InviteCSS.title}>
                            Добро пожаловать в команду {params.team_name}. 
                            Для завершения регистрации заполните форму
                        </Typography.Title>

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
                                label="Позиция"
                                name="position_id"
                                rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите свою позицию!',
                                },
                                ]} 
                                >
                                <Select defaultValue={1}>
                                    {positions.map((position, i) => {
                                        return(
                                                <Option key={i} value={(i+1)}>
                                                    {position}
                                                </Option>
                                            )
                                    })}
                                </Select>
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
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <>
                <Header/>
                <div className="container">
                    <div className={InviteCSS.content}>
                        <Typography.Title level={5} className={InviteCSS.title}>
                            Здравствуйте! Вы уверены, что хотите принять приглашение 
                            в команду {params.team_name}. Для потверждения нажмите кнопку ниже
                        </Typography.Title>
                        <Button 
                            type="primary" 
                            className={InviteCSS.addToTeam} 
                            onClick={OnFinish}>
                                Подтвердить
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}