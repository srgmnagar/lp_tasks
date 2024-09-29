import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

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
            alert("Sign up successful");
        } else {
            alert("Please fix the errors");
        }
    };

    const [myStyle, setMyStyle] = useState({
        color: 'brown',
        backgroundColor: '#f2d6ae'
    })
    const [btntext, setBtnText] = useState("Enable Dark Mode")

    const toggleStyle = () => {
        if (myStyle.color === 'brown') {
            setMyStyle({
                color: '#E5AA70',
                backgroundColor: '#38271c'

            })
            setBtnText("Enable Light Mode")
        }
        else {
            setMyStyle({
                color: 'brown',
                backgroundColor: '#f2d6ae'
            })
            setBtnText("Enable Dark Mode");
        }
    }


    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <nav className=" px-5 py-3 flex-shrink-0 flex justify-end" style={myStyle}>
                <button
                    onClick={toggleStyle}
                    type="button"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                    {btntext}
                </button>
            </nav>
            <main className="flex flex-grow overflow-hidden">
                <img
                    className="w-[50%] "
                    src="https://static.vecteezy.com/system/resources/previews/019/598/179/non_2x/aesthetic-brown-abstract-background-with-copy-space-area-suitable-for-poster-and-banner-vector.jpg"
                    alt=""
                />
                <form
                    style={myStyle}
                    onSubmit={handleSubmit}
                    className="w-[50%] px-16 py-10 border-t border-[#ffffff95] overflow-auto"
                >
                    <div className="flex flex-wrap mx-3 mb-6 justify-center items-start">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                style={myStyle}
                                className="block uppercase tracking-wide text-s font-bold mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                value={form.name}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="name"
                                type="text"
                                placeholder="Jane"
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                style={myStyle}
                                className="block uppercase tracking-wide text-s font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                value={form.username}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="username"
                                type="text"
                                placeholder="Username"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-3 mb-6 justify-center items-start">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                style={myStyle}
                                className="block uppercase tracking-wide text-s font-bold mb-2"
                                htmlFor="pass"
                            >
                                Password
                            </label>
                            <input
                                value={form.pass}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="pass"
                                type="password"
                                placeholder="Password"
                            />
                            {errors.pass && <p className="text-red-500">{errors.pass}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                style={myStyle}
                                className="block uppercase tracking-wide text-s font-bold mb-2"
                                htmlFor="c_pass"
                            >
                                Confirm Password
                            </label>
                            <input
                                value={form.c_pass}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="c_pass"
                                type="password"
                                placeholder="Confirm Password"
                            />
                            {errors.c_pass && <p className="text-red-500">{errors.c_pass}</p>}
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-3 mb-2 justify-center items-start">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                style={myStyle}
                                className="block uppercase tracking-wide text-s font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                value={form.email}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="email"
                                type="text"
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                style={myStyle}
                                className="block uppercase tracking-wide text-s font-bold mb-2"
                                htmlFor="dob"
                            >
                                DOB
                            </label>
                            <input
                                value={form.dob}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="dob"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-3 mb-2 justify-left gap-10">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                style={myStyle}
                                className="block uppercase tracking-wide text-s font-bold mb-2"
                                htmlFor="pno"
                            >
                                Phone Number
                            </label>
                            <input
                                value={form.pno}
                                onChange={change}
                                className="bg-gray-100 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-emerald-500 focus:bg-white shadow-md"
                                id="pno"
                                type="number"
                            />
                        </div>
                        <div className="w-full md:w-auto px-3 mt-6">
                            <button
                                type="submit"
                                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-4 text-center mb-2"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                    <p style={myStyle} className="w-full md:w-auto px-3 mt-6 mx-4 ] text-lg font-serif">
                        Already signed up?{' '}
                        <Link to="/login" className="text-blue-500">
                            Login
                        </Link>
                    </p>
                </form>
            </main>
        </div>


    );
}

export default SignUp;
