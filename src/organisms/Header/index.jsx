import React from 'react';
import { HeaderContext } from '../../context';
import HeaderCSS from './header.module.css'
import {Link} from 'react-router-dom';
import Logo from '../../media/logo.png';
import userPhoto from '../../media/userPhoto.png';

function Header() {
    return(
        <header className={HeaderCSS.header}>
            <div className='container'>
                <div className={HeaderCSS.headerContent}>
                    <Link to='/'>
                        <img src={Logo} className={HeaderCSS.logo}></img>
                    </Link>
                    <p>Футбол – это твой ритм жизни</p>
                    <div className={HeaderCSS.userAccountZone}>
                        <HeaderContext.Consumer>
                            {userParams => {
                                if(userParams !== ''){
                                    return(
                                        <>
                                            <Link to='/profile' className={HeaderCSS.userName}>{userParams.name}</Link>
                                            <img src={userPhoto} className={HeaderCSS.userPhoto}></img>
                                        </>
                                    )
                                } else {
                                    return(
                                        <>
                                            <Link to='/login' className={HeaderCSS.login}>Log in</Link>
                                            <Link to='/registration' className={HeaderCSS.reg}>Sign in</Link>
                                        </>
                                        )
                                }
                            }}
                        </HeaderContext.Consumer>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;