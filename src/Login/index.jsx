import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../organisms/Footer";
import LoginCSS from "./login.module.css";

export default function Login() {
    document.title = "Authorization";
    return(
        <>
            <div className="container">
                <div className={LoginCSS.login}>
                    <form id="form" className={LoginCSS.loginForm}>
                        <label className={LoginCSS.label}>Электронная почта</label>
                        <input id="email" type="email" className={LoginCSS.input}></input>
                        <label className={LoginCSS.label}>Пароль</label>
                        <input id="pass" type="password" className={LoginCSS.input}></input>
                        <button id="logIn" onClick={(event) => {
                            event.preventDefault();
                            const myForm = document.getElementById("form");
                            const userData = {
                                email: myForm.elements.email.value,
                                password: myForm.elements.pass.value
                            };
                            
                            if(userData.email === '' || userData.password === '') {
                                alert('Заполните все поля');
                            } else {
                                const url = "http://localhost:8080/login";
                                axios.post(url, {
                                    email: `${userData.email}`,
                                    password: `${userData.password}`
                                }).then(response => {
                                    if(response.data.code === 200) {
                                        localStorage.setItem('jwt', response.data.jwt)
                                        alert("Вы авторизрировались на сайте.")
                                        window.location.replace("/");
                                    } else if(response.data.code === 403) {
                                        alert("Проверьте корректность данных")
                                    }
                                     else {
                                        alert("Что-то пошло не так, попробуйте позже")
                                    }
                                })
                            }

                        }} className={LoginCSS.push}>Авторизоваться</button>
                    </form>
                    <p>У вас нет аккаунта? Скорее <Link 
                        to="/registration" 
                        className={LoginCSS.link}>регистрируйтесь!</Link></p>
                </div>
            </div>
            <Footer/>
        </>
    );
}