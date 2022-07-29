import { Button, Form, Input, Space, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Header } from "../../components/Header"
import CreateCSS from "./create.module.css"
import axios from 'axios'
import {createTeamURL} from "../../clientConfig.js"
import { useContext } from 'react'
import { UserContext } from '../../hoc/UserProvider'

const SendNewTeam = (teamParams) => {
    const jwt = localStorage.getItem('jwt')
    axios.post(createTeamURL, teamParams, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }).then((res) => {
        const createTeamCode = res.data.code
        if(createTeamCode === 409) {
            alert(`Вы не можете регистрировать более одной команды`)
        } else if(createTeamCode === 201) {
            alert(`Вы создали команду. Поздравляем!`)
            window.location.href = '/'
        } else alert(`Что-то пошло не так. Попробуйте позже`)
    })
}

export const CreateTeam = () => {
    document.title = 'Создать команду'
    const capId = useContext(UserContext).id
    return(
        <>
            <Header/>
            <div className="container">
                <div className={CreateCSS.content}>
                    <Form
                        name="Create-Team"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(e) => {
                            const {teamName, emails} = e
                            SendNewTeam({teamName, emails, capId})
                        }}
                        autoComplete="on"
                        className={CreateCSS.form}
                        >
                        
                        <div className={CreateCSS.teamName}>
                            <Form.Item
                                label="Название команды"
                                name="teamName"
                                rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите название команды!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                className={CreateCSS.push}>
                                Создать команду
                            </Button>
                        </div>

                        <div className={CreateCSS.playersEmails}>
                            <Typography.Title level={4} className={CreateCSS.emailTitle}>
                                Рассылка приглашений игрокам (Свою почту вводить не нужно)
                            </Typography.Title>
                            <Form.List name="emails">
                                {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: 8
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                        {...restField}
                                        name={[name, 'email']}
                                        >
                                        <Input style={{width: 200}} placeholder="Электронная почта" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                    ))}
                                    <Form.Item>
                                    <Button 
                                        type="dashed" 
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}>
                                        Приглашение в команду
                                    </Button>
                                    </Form.Item>
                                </>
                                )}
                            </Form.List>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}