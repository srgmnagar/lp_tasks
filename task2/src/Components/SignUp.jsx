import axios from 'axios';
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        pass: "",
        c_pass: "",
        email: "",
        dob: "",
        pno: "",
    });
    const [errors, setErrors] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [post, setPost] = React.useState(null);
    const navigate = useNavigate();

    const change = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const validate = () => {
        let formErrors = {};
        const nameRegex = /^[A-Za-z\s]{8,20}$/;
        if (!nameRegex.test(form.name)) {
            formErrors.name =
                "Alphabetical characters only, min 8 chars, max 20 chars.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            formErrors.email = "Enter a valid email format";
        }

        const passRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*?_+-])[A-Za-z\d!@#$%^&*?_+-]{8,20}$/;
        if (!passRegex.test(form.pass)) {
            formErrors.pass =
                "Password must be between 8-20 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }

        if (form.pass !== form.c_pass) {
            formErrors.c_pass = "Passwords must match.";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            
        
            axios.post("https://auth-backend-138t.onrender.com/api/v1/users/register", {
                username: form.username,
                fullName: form.name,
                email: form.email,
                password: form.pass,
                phone: form.pno,
                dob: form.dob
            })
            .then((response) => {
                alert("Sign up successful");
                setPost(response.data); 
                console.log(response.data);
                
                navigate("/login"); 
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrors({ serverError: "Bad request, please check your input." });
                    } else if (error.response.status === 409) {
                        setErrors({ serverError: "Username or email already exists." });
                    } else {
                        setErrors({ serverError: "An unexpected error occurred. Please try again." });
                    }
                } else if (error.request) {
                    setErrors({ serverError: "No response from the server. Please check your connection." });
                } else {
                    setErrors({ serverError: "An error occurred while processing the request." });
                }
            });
        }
        
    };

    useEffect(() => {
        const savemode=localStorage.getItem('darkMode')=='true'
        setIsDarkMode(savemode)
        if(savemode){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleStyle = () => {
        const newmode=!isDarkMode
        setIsDarkMode(newmode); 
        document.documentElement.classList.toggle("dark",newmode);
        localStorage.setItem('darkMode',JSON.stringify(newmode))
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} h-screen flex flex-col overflow-hidden`}>
            <nav className="px-5 py-3 flex-shrink-0 flex justify-end bg-[#f2d6ae] dark:bg-[#38271c]">
                <button
                    onClick={toggleStyle}
                    type="button"
                    className="text-white bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    {isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
                </button>
            </nav>

            <main className="flex flex-grow overflow-hidden">
                <img
                    className="w-[50%]"
                    src="https://static.vecteezy.com/system/resources/previews/019/598/179/non_2x/aesthetic-brown-abstract-background-with-copy-space-area-suitable-for-poster-and-banner-vector.jpg"
                    alt=""
                />
                <form
                    onSubmit={handleSubmit}
                    className="w-[50%] px-16 py-10 border-t border-[#ffffff95] overflow-auto bg-[#f2d6ae] dark:bg-[#38271c] text-brown dark:text-[#E5AA70]"
                >
                    <div className="flex flex-wrap mx-3 mb-6 justify-center items-start">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-s font-bold mb-2">
                                Name
                            </label>
                            <input
                                value={form.name}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="name"
                                type="text"
                                placeholder="Jane"
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-s font-bold mb-2">
                                Username
                            </label>
                            <input
                                value={form.username}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="username"
                                type="text"
                                placeholder="Username"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap mx-3 mb-6 justify-center items-start">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-s font-bold mb-2">
                                Password
                            </label>
                            <input
                                value={form.pass}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="pass"
                                type="password"
                                placeholder="Password"
                            />
                            {errors.pass && <p className="text-red-500">{errors.pass}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-s font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                value={form.c_pass}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="c_pass"
                                type="password"
                                placeholder="Confirm Password"
                            />
                            {errors.c_pass && <p className="text-red-500">{errors.c_pass}</p>}
                        </div>
                    </div>

                    <div className="flex flex-wrap mx-3 mb-2 justify-center items-start">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-s font-bold mb-2">
                                Email
                            </label>
                            <input
                                value={form.email}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-s font-bold mb-2">
                                DOB
                            </label>
                            <input
                                value={form.dob}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="dob"
                                type="date"
                                placeholder="Date of Birth"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-s font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                value={form.pno}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 dark:bg-[#4a3428] dark:text-[#E5AA70] rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="pno"
                                type="text"
                                required
                            />
                            {errors.pno && <p className="text-red-600">{errors.pno}</p>}
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Sign in
                        </button>
                    </div>
                    <Link to="/login" className="underline">
                        Already have an account? Log in
                    </Link>
                </form>
            </main>
        </div>
    );
}

export default SignUp;

