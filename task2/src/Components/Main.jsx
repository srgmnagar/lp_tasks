import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import darkIcon from '../img/dark.png';
import lightIcon from '../img/light.png';
import axios from 'axios';
import AuthContext from './AuthProvider'
import changepass from './changepass';

function Main() {
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

  const { auth, refreshAccessTokens, logout } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatedDetails, setUpdatedDetails] = useState({ phone: '', dob: '' });
  const [render, setRender] = useState(false)


  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('https://auth-backend-138t.onrender.com/api/v1/users/current-user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      console.log(response.data);
      setUserDetails(response.data);
      setRender(true)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshAccessTokens();

      } else {
        console.error('Failed to fetch user details', error);
      }
    }
  };

  const changePassword = async () => {
    try {
      await axios.post('https://auth-backend-138t.onrender.com/api/v1/users/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      alert('Password changed successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshAccessTokens();

      } else {
        console.error('Failed to change password', error);
      }
    }
  };

  const updateUserDetails = async () => {
    try {
      const response = await axios.patch('https://auth-backend-138t.onrender.com/api/v1/users/update-details', updatedDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      alert('User details updated successfully');


      setUserDetails(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshAccessTokens();
      } else {
        console.error('Failed to update user details', error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // changePassword();
  }, []);

  return (
    <>{render ?
      <div className='bg-[#fbe7fe] h-screen dark:bg-[#150118] text-[#1e0222] dark:text-[#f9ddfd] font-Italiana'>
        <nav className='border-b-2 border-[#f7cfff] dark:border-[#28102c] px-4 py-2 flex justify-between items-center' >
          <div>
            <button
              onClick={toggleStyle}
              type="button"
              className="hover:bg-[#f7cfff] dark:hover:bg-[#28102c]  rounded-full  p-3  flex items-center justify-center "
            >

              <img
                src={isDarkMode ? darkIcon : lightIcon}
                alt={isDarkMode ? "Light Mode Icon" : "Dark Mode Icon"}
                className="w-8 h-8"
              />

            </button>
          </div>
          <p className='text-inherit font-extrabold text-2xl '>Welcome, {userDetails?.data.fullName} </p>
          <div>

            <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-600/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-lg px-8 py-2 my-auto text-center me-2 mb-2' onClick={logout}>Logout</button>
          </div>

        </nav>
        <main className='bg-[#9277f0] px-12 py-7 rounded-xl max-w-screen-lg mx-auto mt-40 flex flex-col gap-4'>
          <h1 className='text-[#1e0222] font-extrabold text-3xl' >User Details</h1>
          <section className='flex justify-left gap-48'>
          <div className='flex gap-1'>
          <h1 className='text-[#1e0222] font-extrabold text-2xl' >Username: </h1>
          <p className='italic text-[#581461] font-extrabold text-2xl'>{userDetails?.data.username}</p>
          </div>
          <div className='flex gap-1'>
          <h1 className='text-[#1e0222] font-extrabold text-2xl' >Email: </h1>
          <p className='italic text-[#581461] font-extrabold text-2xl'>{userDetails?.data.email}</p>
          </div>
          </section>

          <section className='flex justify-left gap-48'>
          <div className='flex gap-1'>
          <h1 className='text-[#1e0222] font-extrabold text-2xl' >Phone Number: </h1>
          <p className='italic text-[#581461] font-extrabold text-2xl'>{userDetails?.data.phone}</p>
          </div>
          <div className='flex gap-1'>
          <h1 className='text-[#1e0222] font-extrabold text-2xl' >DOB: </h1>
          <p className='italic text-[#581461] font-extrabold text-2xl'>{userDetails?.data.dob}</p>
          </div>
          </section>

          <section className='flex justify-left mt-2'>
          <div className='flex gap-2'>
          <Link to="/changepass" className='text-[#f9ddfd] bg-[#98105d]  focus:ring-2 focus:outline-none focus:ring-black font-bold rounded-lg text-lg px-8 py-2 my-auto text-center me-2 mb-2 hover:translate-y-1 transition-all'>Update Password</Link>
          <Link to="/updatedeets" className='text-[#f9ddfd] bg-[#e72448]  focus:ring-2 focus:outline-none focus:ring-black font-bold rounded-lg text-lg px-8 py-2 my-auto text-center me-2 mb-2 hover:translate-y-1 transition-all'>Update User details</Link>
          
          </div>
          </section>
        </main>

      </div> : <div>loading...</div>
    }
    </>
  )
}

export default Main
