import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {

    const navigate = useNavigate("");
    const [loading, setLoading] = useState(false);

    // const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];

    // Extract existing emails and phone numbers from stored user data
    const existingEmails = storedUserData.map((user) => user.email);
    const existingPhoneNumbers = storedUserData.map((user) => user.number);


    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            number: '',
            password: '',
            confirmpassword: '',
        },

        validationSchema: Yup.object({
            username: Yup.string()
              .max(20, 'Name must be 20 characters or less.')
              .required("Username is required"),
            email: Yup.string()
              .email('Invalid email address')
              .required("Email is required"),
            number: Yup.string()
              .matches(/^\d{11}$/, 'Invalid Phone number')
              .required("Phone Number is required"),
            password: Yup.string()
              .matches(/^(?=.*\d)(?=.*[a-zA-Z])[\w\s!@#$%^&*()-=_+~`[\]{}|\\:;"'<>,.?/]{8,}$/, 'Password must make sense')
              .required("Password is required"), 
            confirmpassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 
              'Passwords must match')   
              .required("Confirm Password is required"),

        }),


        onSubmit: (values) => {
            setLoading(true);
            if (existingEmails.includes(values.email)) {
                setLoading(false);
                toast.error('User already exists');
            }else if (existingPhoneNumbers.includes(values.number)) {
                setLoading(false);
                toast.error('User already exists');
            }else {
                console.log(values);
                const newData = [...storedUserData, values];
                // localStorage.setItem('userData', JSON.stringify(values));
                localStorage.setItem('userData', JSON.stringify(newData));
                navigate('/login');
            }
        },
    });


  return (
    <div className='w-full flex flex-col justify-center items-center bg-[#f2f2f2] h-screen'>
      <h4>SIGN UP PAGE</h4>
      <div className=" bg-white p-6 w-1/2 shadow-lg rounded-lg">
        <div className="form mt-3 block">
            <form className='mb-4 w-full' onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="Username" className={`${formik.touched.username && formik.errors.username ? "text-red-400" : ""}`}>{formik.touched.username && formik.errors.username ? formik.errors.username : "Username:"}</label>
                    <input type='name'
                    placeholder='Enter Username'
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    className="mb-2 w-full border-2 border-gray-500 rounded px-4 "/><br />
                </div>

                <div>
                    <label htmlFor="Email" className={`${formik.touched.email && formik.errors.email ? "text-red-400" : ""}`}>{formik.touched.email && formik.errors.email ? formik.errors.email : "Email:"}</label>
                    <input type="email" 
                    placeholder='Enter Email' 
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange} 
                    className='mb-2 w-full border-2 border-gray-500 rounded px-4'/><br />
                </div>

                <div>
                    <label htmlFor="Number" className={`${formik.touched.number && formik.errors.number ? "text-red-400" : ""}`}>{formik.touched.number && formik.errors.number ? formik.errors.number : "Phone Number:"}</label>
                    <input type="tel" 
                    placeholder='Enter Phone Number' 
                    name='number'
                    value={formik.values.number}
                    onChange={formik.handleChange} 
                    className='mb-2 w-full border-2 border-gray-500 rounded px-4'/><br />
                </div>

                <div>
                    <label htmlFor="Password" className={`${formik.touched.password && formik.errors.password ? "text-red-400" : ""}`}>{formik.touched.password && formik.errors.password ? formik.errors.password : "Password:"}</label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange} 
                    className='mb-2 w-full border-2 border-gray-500 rounded px-4'/><br />
                </div>

                <div>
                    <label htmlFor="Password" className={`${formik.touched.confirmpassword && formik.errors.confirmpassword ? "text-red-400" : ""}`}>{formik.touched.confirmpassword && formik.errors.confirmpassword ? formik.errors.confirmpassword : "Confirm Password:"}</label>
                    <input type="password" 
                    placeholder='Confirm Password' 
                    name='confirmpassword'
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange} 
                    className='mb-2 w-full border-2 border-gray-500 rounded px-4'/><br />
                </div>
                <p>Already have an account? <Link to='/login' className='text-blue-400'>Log in</Link> </p>

                <div className="mt-3">
                    <button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-all' disabled={loading}>{loading ? 'Loading...' : 'Sign up'}</button>
                </div>
                <ToastContainer/>

            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
