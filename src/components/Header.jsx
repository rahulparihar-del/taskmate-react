import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

function Header() {

  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")) || "medium");

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.removeAttribute("class");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
   <header>
    {/* Add logo and name */}
    <div className="logo">
      <img src={logo} alt="Taskmate Logo" />
      <span>Taskmate</span>
    </div> 

    {/* Add Theme */}

    <div className="themeSelector">
            <span onClick={() => setTheme("light")} className={ theme === "light" ? "light activeTheme" : "light"}></span>
            <span onClick={() => setTheme("medium")} className={ theme === "medium" ? "medium activeTheme" : "medium"}></span>
            <span onClick={() => setTheme("dark")} className={ theme === "dark" ? "dark activeTheme" : "dark"}></span>
            <span onClick={() => setTheme("gOne")} className={ theme === "gOne" ? "gOne activeTheme" : "gOne"}></span>
            {/* <span onClick={() => setTheme("gTwo")} className={ theme === "gTwo" ? "gTwo activeTheme" : "gTwo"}></span> */}
            {/* <span onClick={() => setTheme("gThree")} className={ theme === "gThree" ? "gThree activeTheme" : "gThree"}></span> */}
        </div>
   </header>
  )
}

export default Header