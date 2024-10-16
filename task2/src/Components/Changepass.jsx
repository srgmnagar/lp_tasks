import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import darkIcon from '../img/dark.png';
import lightIcon from '../img/light.png';
import axios from 'axios';
import AuthContext from './AuthProvider'

function changepass() {
 // Dark/Light mode state
 const [isDarkMode, setIsDarkMode] = useState(false);
 useEffect(() => {
   const savemode = localStorage.getItem('darkMode') == 'true'
   setIsDarkMode(savemode)
   if (savemode) {
     document.documentElement.classList.add("dark");
   }
   else {
     document.documentElement.classList.remove("dark");
   }
 }, []);

 const toggleStyle = () => {
   const newmode = !isDarkMode
   setIsDarkMode(newmode);
   document.documentElement.classList.toggle("dark", newmode);
   localStorage.setItem('darkMode', JSON.stringify(newmode))
 };

  return (
    <div className='bg-[#fbe7fe] h-screen dark:bg-[#150118] text-[#1e0222] dark:text-[#f9ddfd] font-Italiana flex justify-center items-center'>
      
        <main className='bg-[#9277f0] px-12 py-7 rounded-xl max-w-screen-lg mx-auto my-auto flex flex-col gap-4'>
          <h1 className='text-[#1e0222] font-extrabold text-3xl' >Update Password</h1>

          <div className='flex flex-col gap-1'>
          <label for="currpass" className='text-[#1e0222] font-extrabold text-xl' >Current password: </label>
          <input type="password" className="shadow border-2 border-violet-800 bg-violet-300 rounded w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900" id="currpass"  placeholder="******"/>
          </div>
          
          <div className='flex flex-col gap-1'>
          <label for="newpass" className='text-[#1e0222] font-extrabold text-xl' >New password: </label>
          <input type="password" className="shadow border-2 border-violet-800 bg-violet-300 rounded w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900" id="newpass" placeholder="******"/>
          </div>

          <div className='flex flex-col gap-1'>
          <label for="cpass" className='text-[#1e0222] font-extrabold text-xl' >Confirm password: </label>
          <input type="password" className="shadow border-2 border-violet-800 bg-violet-300 rounded w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900" id="cpass"  placeholder="******"/>
          </div>

          <section className='flex justify-left mt-2'>
          <div className='flex gap-2'>
          <Link to="/changepass" className='text-[#f9ddfd] bg-[#98105d]  focus:ring-2 focus:outline-none focus:ring-black font-bold rounded-lg text-lg px-8 py-2 my-auto text-center me-2 mb-2 hover:translate-y-1 transition-all'>Update Password</Link>

          
          </div>
          </section>
        </main>

      </div>
  )
}

export default changepass
