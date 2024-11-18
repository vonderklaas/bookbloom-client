import { Link } from "react-router-dom"
import './Footer.css'

export const Footer = () => {
  return (
    <footer className="footer">
        <small>All rights reserved. ©2024 — ©2025</small>
        <div className="footer-links">
            <small><Link to={'author'}>Author</Link></small>
            <small><Link to={'support'}>Support</Link></small>
        </div>
    </footer>
  )
}