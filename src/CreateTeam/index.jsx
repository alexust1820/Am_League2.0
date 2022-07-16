import React from "react";
import { UserParamsContext } from "../context";
import CreateTeamCSS from './createteam.module.css';
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import axios from "axios";

export default function CreateTeam() {
    let inputs = document.getElementById('inputs')
    let counter = 1;
    return(
        <>
            <Header/>
            <UserParamsContext.Consumer>
                {userParams => {
                    return(
                        <>
                            <div className="container">
                                <div className={CreateTeamCSS.createTeam}>
                                    <form id="createTeam" className={CreateTeamCSS.createTeamForm}>
                                        <div className={CreateTeamCSS.teamName}>
                                            <label className={CreateTeamCSS.label}>Название команды</label>
                                            <input className={CreateTeamCSS.input}></input>
                                        </div>
                                        <div id="inputs" className={CreateTeamCSS.playersEmails}>
                                            <label className={CreateTeamCSS.label}>Электронные почты игроков</label>
                                            <span className={CreateTeamCSS.span}>Свою почту указывать не нужно. 
                                                <br/> Вы можете добавить игроков позже
                                            </span>
                                            <input placeholder="1-й" className="input"></input>
                                        </div>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            const formInputs = document.querySelectorAll('input');
                                            let teamParams = {
                                                cap_id: userParams.id,
                                                name: '',
                                                emails: []
                                            }

                                            if(formInputs[0].value === '') {
                                                alert("Введите название команды")
                                                return 0;
                                            }

                                            formInputs.forEach((elem, i) => {
                                                if(i === 0) {
                                                    teamParams.name = formInputs[i].value
                                                } else {
                                                    teamParams.emails.push(formInputs[i].value)
                                                }
                                            })

                                            const url = "http://localhost:8080/create-team";
                                            const token = localStorage.getItem("jwt");
                                            
                                            axios.defaults.headers.Authorization = `Bearer ${token}`

                                            axios.post(url,
                                            {
                                                name: teamParams.name,
                                                cap_id: teamParams.cap_id,
                                                emails: teamParams.emails
                                            }).then(res => {
                                                if(res.data.code === 200) {
                                                    alert(`Вы создали команду ${teamParams.name}, приглашения отправлены. Поздравляем!`)
                                                    window.location.href = "/profile";
                                                } else if (res.data.code === 403) {
                                                    alert(`Вы являетесь на авторизированным пользователем. Вы не можете создавать команды`)
                                                } else if (res.data.code === 409) {
                                                    alert(`Вы уже зарегистрировали команду. Вы не можете регистрировать более одной команды`)
                                                } else {
                                                    alert(`Что-то пошло не так`)
                                                }
                                            })

                                            

                                        }} className={CreateTeamCSS.push}>Создать</button>
                                    </form>

                                    <button onClick={(event) => {
                                                event.preventDefault();
                                                let inputs = document.getElementById('inputs')
                                                counter++
                                                inputs.innerHTML += `<input placeholder="${counter}-й" class="input"></input>`
                                            }} className={CreateTeamCSS.plus}>Добавить поле для ввода email</button>
                                </div>
                            </div>
                        </>
                    );
                }}
            </UserParamsContext.Consumer>
            <Footer/>
        </>
    );
}