import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Login() {
    const [form, setForm] = useState({
        username: "",
        pass: "",
    });
    const [errors, setErrors] = useState({});

    const change = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const validate = () => {
        let formErrors = {}

        const passRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*?_+-])[A-Za-z\d!@#$%^&*?_+-]{8,20}$/;
        if (!passRegex.test(form.pass)) {
            formErrors.pass =
                "Password must be between 8-20 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }
        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            alert("Login successful");
        } else {
            alert("Please fix the errors");
        }
    };

    const [myStyle, setMyStyle] = useState({
        color: 'brown',
        backgroundColor: '#f2d6ae'
    });
    const [btntext, setBtnText] = useState("Enable Dark Mode");
    const toggleStyle = () => {
        if (myStyle.color === 'brown') {
            setMyStyle({
                color: '#E5AA70',
                backgroundColor: '#38271c'
            });
            setBtnText("Enable Light Mode");
        } else {
            setMyStyle({
                color: 'brown',
                backgroundColor: '#f2d6ae'
            });
            setBtnText("Enable Dark Mode");
        }
    };

    return (
        <div>
    <div className="h-screen flex flex-col overflow-hidden">
        <nav className="px-5 py-2 flex-shrink-0 flex justify-end" style={myStyle}>
            <button
                onClick={toggleStyle}
                type="button"
                className="text-white bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none shadow-md dark:shadow-md dark:shadow-amber-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                {btntext}
            </button>
        </nav>

        <main className="flex flex-grow items-center justify-center overflow-hidden h-full">
            <img
                className="w-[50%] h-full"
                src="https://static.vecteezy.com/system/resources/previews/019/598/179/non_2x/aesthetic-brown-abstract-background-with-copy-space-area-suitable-for-poster-and-banner-vector.jpg"
                alt=""
            />

            <form
                style={myStyle}
                onSubmit={handleSubmit}
                className="w-[50%] h-full flex flex-col justify-center items-center border-t border-[#ffffff95] overflow-auto align-top"
            >
                <div className="w-full md:w-1/2 mb-4">
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
                        className="bg-gray-100 text-gray-700 rounded py-3 px-4 focus:outline-emerald-500 focus:bg-white shadow-md w-full"
                        id="username"
                        type="text"
                        placeholder="Username"
                    />
                    {errors.username && <p className="text-red-500">{errors.username}</p>}
                </div>

                <div className="w-full md:w-1/2 mb-4">
                    <label
                        style={myStyle}
                        className="block uppercase tracking-wide text-s font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        value={form.pass}
                        onChange={change}
                        className="bg-gray-100 text-gray-700 rounded py-3 px-4 focus:outline-emerald-500 focus:bg-white shadow-md w-full"
                        id="pass"
                        type="password"
                        placeholder="Password"
                    />
                    {errors.pass && <p className="text-red-500">{errors.pass}</p>}
                </div>

                <div className="w-full md:w-auto px-3 mt-4">
                    <button
                        type="submit"
                        className="text-white bg-[black] via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-3xl text-base px-9 py-3 text-center my-2"
                    >
                        Login
                    </button>
                </div>

                <p
                style={myStyle} className="mt-4 text-lg font-serif">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500">
                        Sign Up
                    </Link>
                </p>
            </form>
        </main>
    </div>
</div>



    );
}

export default Login;
