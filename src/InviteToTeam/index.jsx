import React from "react";
import axios from "axios";
import Footer from "../organisms/Footer";
import InviteToTeamCSS from "./inviteToTeam.module.css";

export default function InviteToTeam() {
    const url = window.location.href
    const params = (new URL(url)).searchParams
    const userEmail = params.get('email')
    
    return(
        <>
            <div className="container">
                <div className={InviteToTeamCSS.inviteContent}>
                    <form id="inviteForm" className={InviteToTeamCSS.inviteForm}>
                        <label className={InviteToTeamCSS.label}>Имя</label>
                        <input id="name" className={InviteToTeamCSS.input}></input>

                        <label className={InviteToTeamCSS.label}>Фамилия</label>
                        <input id="lastname" className={InviteToTeamCSS.input}></input>

                        <label className={InviteToTeamCSS.label}>Телефон</label>
                        <input id="phone" className={InviteToTeamCSS.input}></input>

                        <label className={InviteToTeamCSS.label}>Пароль</label>
                        <input id="pass" type="password" className={InviteToTeamCSS.input}></input>

                        <button onClick={(event) => {
                            event.preventDefault();
                            const myForm = document.getElementById("inviteForm");
                            const userParams = {
                                name: myForm.elements.name.value,
                                lastname: myForm.elements.lastname.value,
                                email: userEmail,
                                phone: myForm.elements.phone.value,
                                password: myForm.elements.pass.value
                            }
                            
                            if(userParams.name === '' || userParams.lastname === '' 
                            || userParams.email === '' || userParams.password === '' || userParams.phone === '') {
                                alert('Заполните все поля');
                            } else {
                                const url = "http://localhost:8080/registration";
                                axios.post(url, {
                                    name: `${userParams.name}`,
                                    lastname: `${userParams.lastname}`,
                                    email: `${userParams.email}`,
                                    phone: `${userParams.phone}`,
                                    password: `${userParams.password}`
                                }).then(response => {
                                    if(response.data.code === 201) {
                                        localStorage.setItem('jwt', response.data.jwt)
                                        alert("Вы зарегистроровались на сайте. Все ваши данные были успешно сохранены")
                                        // window.location.replace("/");
                                    } else if (response.data.code === 401) {
                                        alert("На данную почту уже зарегистрирован пользователь")
                                    } else if (response.code === "ERR_NETWORK") {
                                        alert("Что-то пошло не так, попробуйте позже")
                                    }
                                })
                            }

                        }} className={InviteToTeamCSS.push}>Reg in</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}