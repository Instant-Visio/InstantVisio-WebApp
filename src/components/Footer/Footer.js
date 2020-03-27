import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <Link to="/mentions-legales" className="footer-link">CGU</Link>
                </li>
                <li>
                    <a
                        className="footer-link"
                        href="mailto:contact@instantvisio.com?Subject=Prise de contact"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Nous contacter</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer