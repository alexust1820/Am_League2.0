import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Footer from "../organisms/Footer";
import RegCSS from "./registration.module.css";

export default function Registration() {
    document.title = "Registration";
    
    return(
        <>
            <div className="container">
                <form id="form" className={RegCSS.registration}>
                    
                    <div className={RegCSS.fullName}>
                        <label className={RegCSS.label}>Имя</label>
                        <input id="name" type="text" className={RegCSS.input}></input>
                        <label className={RegCSS.label}>Фамилия</label>
                        <input id="lastname" type="text" className={RegCSS.input}></input>
                    </div>

                    <div className={RegCSS.contacts}>
                        <label className={RegCSS.label}>Электронная почта</label>
                        <input id="email" type="email" className={RegCSS.input}></input>
                        <label className={RegCSS.label}>Телефон</label>
                        <input id="phone" type="phone" className={RegCSS.input}></input>
                    </div>

                    <div className={RegCSS.password}>
                        <label className={RegCSS.label}>Пароль</label>
                        <input id="pass" type="password" className={RegCSS.input}></input>
                    </div>

                    <p className={RegCSS.loginBlock}>У вас уже есть аккаунт? Скорее <Link 
                        to="/login" 
                        className={RegCSS.link}>авторизируйтесь!</Link></p>

                    <button id="regIn" onClick={(event) => {
                        event.preventDefault();
                        const myForm = document.getElementById("form");

                        const userData = {
                            name: myForm.elements.name.value,
                            lastname: myForm.elements.lastname.value,
                            email: myForm.elements.email.value,
                            phone: myForm.elements.phone.value,
                            password: myForm.elements.pass.value
                        }

                        if(userData.name === '' || userData.lastname === '' 
                        || userData.email === '' || userData.password === '' || userData.phone === '') {
                            alert('Заполните все поля');
                        } else {
                            const url = "http://localhost:8080/registration";
                            axios.post(url, {
                                name: `${userData.name}`,
                                lastname: `${userData.lastname}`,
                                email: `${userData.email}`,
                                phone: `${userData.phone}`,
                                password: `${userData.password}`
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

                    }} className={RegCSS.push}>Зарегистрироваться</button>
                </form>
            </div>
            <Footer/>
        </>
    );
}