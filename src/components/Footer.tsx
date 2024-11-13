import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="footer">
        <small>©2024-2025</small>
        <small>by <Link target="_blank" to='https://github.com/vonderklaas'>@vonderklaas</Link></small>
    </footer>
  )
}