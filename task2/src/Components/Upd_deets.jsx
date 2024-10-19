import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Upd_deets() {
  const [num, setNum] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const numRegex = /^[6-9]\d{9}$/; // Validating Indian phone number
    if (!numRegex.test(num)) {
      setError('Phone number must be 10 digits and start with 6-9.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    try {
      const response = await axios.patch(
        'https://auth-backend-138t.onrender.com/api/v1/users/update-details',
        {
          phone: num,
          dob: dob,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      setSuccess('Details updated successfully!');
      setNum('');
      setDob('');
      alert('Details updated successfully!');
      navigate('/main');
    } catch (error) {
      setError('Request failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='bg-[#fbe7fe] h-screen dark:bg-[#150118] text-[#1e0222] dark:text-[#f9ddfd] font-Italiana flex justify-center items-center'>
      <main className='bg-[#9277f0] px-11 py-6 rounded-xl w-4/5 md:w-1/2 lg:w-1/3 mx-auto my-auto flex flex-col gap-4'>
        <div className='flex flex-col items-center'>
          <h1 className='text-[#1e0222] font-extrabold text-3xl'>Update Details</h1>
        </div>
        {error && <div className='text-red-600 font-medium text-base text-inherit font-noto rounded-xl'>{error}</div>}
        {success && <div className='text-green-700 font-medium text-base text-inherit font-noto rounded-xl'>{success}</div>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="num" className='text-[#1e0222] font-extrabold text-xl'>Phone number: </label>
            <input
              onChange={(e) => setNum(e.target.value)}
              value={num}
              type="number"
              className="shadow border-2 border-violet-800 bg-violet-300 rounded-xl w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900"
              id="num"
              placeholder="******"
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="dob" className='text-[#1e0222] font-extrabold text-xl'>DOB </label>
            <input
              onChange={(e) => setDob(e.target.value)}
              value={dob}
              type="date"
              className="shadow border-2 border-violet-800 bg-violet-300 rounded-xl w-full py-2 px-3 text-violet-800 font-bold focus:ring-2 focus:outline-none focus:ring-violet-900"
              id="dob"
              placeholder="******"
            />
          </div>

          <section className='flex justify-center mt-2'>
            <div className='flex gap-2'>
              <button
                type="submit"
                className='text-[#f9ddfd] bg-[#98105d] focus:ring-2 focus:outline-none focus:ring-black font-bold rounded-lg text-lg px-8 py-2 my-auto text-center me-2 mb-2 hover:translate-y-1 transition-all'>
                Update
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}

export default Upd_deets;

