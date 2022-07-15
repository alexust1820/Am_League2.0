import React from "react";
import {Link} from "react-router-dom";
import FooterCSS from './footer.module.css';

export default function Footer() {
    return(
        <div className={FooterCSS.footer}>
            <div className="container">
                <div className={FooterCSS.content}>
                    
                    <div className={FooterCSS.contactsBlock}>
                        <h4 className={FooterCSS.title}>Контакты</h4>
                        <ol className={FooterCSS.contacts}>
                            <li className={FooterCSS.contact}>
                                Электронная почта - <a href="mailto:amleague.russia@gmail.com" target="_blank"
                                                        className={FooterCSS.link}>
                                    amleague.russia@gmail.com
                                </a>
                            </li>
                            <li className={FooterCSS.contact}>Кустов Александр 
                                (Вконтакте) - <a href="https://vk.com/alexyto4kin" target="_blank"
                                                    className={FooterCSS.link}>
                                                    vk.com/alexyto4kin
                                </a>
                            </li>
                            <li className={FooterCSS.contact}>Егор Васильев 
                                (Вконтакте) - <a href="https://vk.com/egor.velv" target="_blank"
                                            className={FooterCSS.link}>
                                                vk.com/egor.velv
                                </a>
                            </li>
                        </ol>
                    </div>

                    <div className={FooterCSS.linksBlock}>
                        <h4 className={FooterCSS.title}>Полезные ссылки</h4>
                        <ol className={FooterCSS.links}>
                            <li className={FooterCSS.importantLink}>
                                <a href="#" 
                                    target="_blank" 
                                    className={FooterCSS.link}>
                                    Официальное сообщество во Вконтакте
                                </a>
                            </li>
                            <Link to="/" className={FooterCSS.link}>На главную</Link>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}