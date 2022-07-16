import React from "react";
import {Link} from "react-router-dom";
import { UserParamsContext } from "../context";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import ProfileCSS from './profile.module.css';


export default function Profile() {
    return(
        <>
            <Header/>
            <div className="container">
                <div className={ProfileCSS.profile}>
                    <UserParamsContext.Consumer>
                        {userParams => {
                            return(
                                <>
                                    <h4 className={ProfileCSS.name}>Имя - {userParams.name}</h4>
                                    <h4 className={ProfileCSS.lastname}>Фамилия - {userParams.lastname}</h4>
                                    <h4 className={ProfileCSS.email}>Электронная почта - {userParams.email}</h4>

                                    <Link to="/profile/create-team" className={ProfileCSS.createTeam}>Создать команду</Link>
                                </>
                            )
                        }}
                    </UserParamsContext.Consumer>
                </div>
            </div>
            <Footer/>
        </>
    );
}