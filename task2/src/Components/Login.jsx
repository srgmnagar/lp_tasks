import React, { useState, useEffect, useRef} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    // const [form, setForm] = useState({
    //     username: "",
    //     pass: "",
    // });

    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setpwd] = useState('')
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('')
    const navigate = useNavigate();

    // useEffect(() => {
    //     userRef.current.focus()
    // }, []);
    useEffect(() => {
        setErrors('')
    }, [user, pwd]);

    const change = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://auth-backend-138t.onrender.com/api/v1/users/login", {
            email: user,
            password:pwd
        })
        .then((response) => {
            
            const { accessToken, refreshToken } = response.data;
            // Store tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // Redirect to main page
            setSuccess(true);
            navigate("/main");
        })
        .catch((error) => {
           if(!err?.response){
            setErrors('No server message')
           }
           else if(err.response?.status==400){
            setErrors('Missing username and pass')
           }
           else if(err.response?.status==401){
            setErrors('unauthorized')
           }
           else{
            setErrors('login failed')
           }
        });
        setUser('')
        setpwd('')
    };


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
        <div className={`${isDarkMode ? 'dark' : ''} h-screen flex flex-col overflow-hidden`}>
            <nav className="px-5 py-2 flex-shrink-0 flex justify-end bg-[#f2d6ae] dark:bg-[#38271c]">
                <button
                    onClick={toggleStyle}
                    type="button"
                    className="text-white bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    {isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
                </button>
            </nav>

            <main className="flex flex-grow items-center justify-center overflow-hidden h-full">
                <img
                    className="w-[50%] h-full"
                    src="https://static.vecteezy.com/system/resources/previews/019/598/179/non_2x/aesthetic-brown-abstract-background-with-copy-space-area-suitable-for-poster-and-banner-vector.jpg"
                    alt=""
                />

                <form
                    onSubmit={handleSubmit}
                    className="w-[50%] h-full flex flex-col justify-center items-center border-t border-[#ffffff95] overflow-auto align-top bg-[#f2d6ae] dark:bg-[#38271c]"
                >
                    <div className="w-full md:w-1/2 mb-4">
                        <label
                            className="block uppercase tracking-wide text-s font-bold mb-2 text-brown dark:text-[#E5AA70]"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            value={user}
                            onChange={(e) => {
                                setUser(e.target.value)
                            }}
                            className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 focus:outline-emerald-500 focus:bg-white shadow-md w-full"
                            id="username"
                            type="text"
                            placeholder="Username"
                            required
                        />
                        {errors.username && <p className="text-red-500">{errors.username}</p>}
                    </div>

                    <div className="w-full md:w-1/2 mb-4">
                        <label
                            className="block uppercase tracking-wide text-s font-bold mb-2 text-brown dark:text-[#E5AA70]"
                            htmlFor="pass"
                        >
                            Password
                        </label>
                        <input
                            value={pwd}
                            onChange={(e) => {
                                setpwd(e.target.value)
                            }}
                            className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 focus:outline-emerald-500 focus:bg-white shadow-md w-full"
                            id="pass"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        {errors.pass && <p className="text-red-500">{errors.pass}</p>}
                    </div>

                    <p className={`${errors ? "errormsg" : "offscreen"}`}>{errors}</p>

                    <div className="w-full md:w-auto px-3 mt-4">
                        <button
                            type="submit"
                            className="text-white bg-[black] via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-base px-9 py-3 text-center my-2"
                        >
                            Login
                        </button>
                    </div>

                    <p className="mt-4 text-lg font-serif text-brown dark:text-[#E5AA70]">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-500">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    );
}

export default Login;
