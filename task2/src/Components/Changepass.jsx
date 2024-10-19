import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import AuthContext from './AuthProvider'

function changepass() {
 // Dark/Light mode state
  const [oldpass,setOldpass]=useState('')
  const [newpass,setNewpass]=useState('')
  const [confirmpass,setConfirmpass]=useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate()

  const validate = () => {
    const passRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*?_+-])[A-Za-z\d!@#$%^&*?_+-]{8,20}$/;
    if (!passRegex.test(newpass)) {
      setError(
        'Password must be between 8-20 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return false;
    }
    setError(''); 
    return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(''); // Clear any previous errors
  setSuccess(''); // Clear previous success messages

  if (!validate()) return;

  if (newpass !== confirmpass) {
    setError('New password and confirm password do not match.');
    return;
  }

  try {
    const response = await axios.post(
      'https://auth-backend-138t.onrender.com/api/v1/users/change-password',
      {
        oldPassword: oldpass,
        newPassword: newpass,
        confirmPassword: confirmpass,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    setSuccess('Password updated successfully!');
    setOldpass('');
    setNewpass('');
    alert("Password updated successfully!")
    setConfirmpass('');
    navigate('/main');
  } catch (error) {
    setError('Current password is incorrect or request failed.');
    console.error(error);
  }
};


  return (
    <div className='bg-[#fbe7fe] h-screen dark:bg-[#150118] text-[#1e0222] dark:text-[#f9ddfd] font-Italiana flex justify-center items-center'>
      
        <main className='bg-[#9277f0] px-11 py-6 rounded-xl w-4/5 md:w-1/2 lg:w-1/3 mx-auto my-auto flex flex-col gap-4'>
        <div className='flex flex-col items-center'>
          <h1 className='text-[#1e0222] font-extrabold text-3xl' >Update Password</h1>
        </div>
          {error && <div className='text-red-600 font-medium text-base text-inherit font-noto rounded-xl'>{error}</div>}
          {success && <div className='text-green-700 font-medium text-base text-inherit font-noto rounded-xl'>{success}</div>}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <div className='flex flex-col gap-1'>
          <label htmlFor="currpass" className='text-[#1e0222] font-extrabold text-xl' >Current password: </label>
          <input required onChange={(e) => setOldpass(e.target.value)} value={oldpass} type="password" className="shadow border-2 border-violet-800 bg-violet-300 rounded-xl w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900" id="currpass"  placeholder="******"/>
          </div>
          
          <div className='flex flex-col gap-1'>
          <label htmlFor="newpass" className='text-[#1e0222] font-extrabold text-xl' >New password: </label>
          <input required onChange={(e) => setNewpass(e.target.value)} value={newpass} type="password" className="shadow border-2 border-violet-800 bg-violet-300 rounded-xl w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900" id="newpass" placeholder="******"/>
          </div>

          <div className='flex flex-col gap-1'>
          <label htmlFor="cpass" className='text-[#1e0222] font-extrabold text-xl' >Confirm password: </label>
          <input required onChange={(e) => setConfirmpass(e.target.value)} value={confirmpass} type="password" className="shadow border-2 border-violet-800 bg-violet-300 rounded-xl w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900" id="cpass"  placeholder="******"/>
          </div>

          <section className='flex justify-center mt-2'>
          <div className='flex gap-2'>
          
          <button type="submit" className='text-[#f9ddfd] bg-[#98105d] focus:ring-2 focus:outline-none focus:ring-black font-bold rounded-lg text-lg px-8 py-2 my-auto text-center me-2 mb-2 hover:translate-y-1 transition-all'>Update Password</button>

          
          </div>
          </section>
          </form>
        </main>

      </div>
  )
}

export default changepass
