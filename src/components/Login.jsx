import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FaHouse } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {

        setLoading(true);


        const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
        const user = storedUserData.find((user) => user.email === values.email);

        if (!user) {
            setLoading(false);
             toast ('User not found');
         } else if (user.password !== values.password) {
             setLoading(false);
             toast ('Incorrect password');
         } else {
             // Add logic for setting user as authenticated (e.g., setting a token)
             navigate(`/home/${formik.values.email}`);
             
         }
    }

    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleLogin,
    });


  return (
    <div className='container w-full flex flex-col justify-center items-center bg-[#f2f2f2] h-screen'>
      <Link to='/home'><button className='px-9 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-all ml-4'>Back To Home</button></Link>  
      <h4>LOGIN PAGE</h4>
      <div className=" bg-white p-6 shadow-lg rounded-lg w-[90%] max-w-[705px] ">
        <div className='form mt-3 block'>
            <form className='mb-4 w-full' onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="Email" className= "">Email Address:</label>
                    <input type='email'
                    placeholder='Enter Email Address'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="mb-2 w-full border-2 border-gray-500 rounded" required/><br  />
                </div>

                <div>
                    <label htmlFor="Password" className= "">Password:</label>
                    <input type='password'
                    placeholder='Enter your password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="mb-2 w-full border-2 border-gray-500 rounded" required/><br />
                </div>

                <div className="mt-3">
                    <button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-[30px] hover:bg-blue-400 transition-all'>{loading ? "Loading" : "Log in"}</button>
                    <p>If you don't have an account <Link to='/signup' className='text-blue-400'>Sign up</Link> </p>
                </div>
                <ToastContainer/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
