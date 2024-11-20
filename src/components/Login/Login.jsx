import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { authContext } from "../../Contexts/AuthContext";


export default function Login() {

const {setUserIsLoggedIn,userIsLoggedIn} = useContext(authContext)

  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  
  const validate2 = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'enter a valid email'),
    password: Yup.string().required('password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password must not less than 8 characters and includes capital letter'),
  })




  // Formik library to handel form============================>
  const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid } = useFormik({
    initialValues: {
     
      email: "",
      password: "",
    
    },
    onSubmit: async () => {
      setErrorMsg('');
      // start fetching Api 

      try {
        setIsLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        if (data.message == 'success') {
          setUserIsLoggedIn(true)
          localStorage.setItem("token", data.token)

          if (window.location.pathname =='login'){
            navigate('/home')
          
          }  else{
             navigate(window.location.pathname) 
          }

        }
        console.log(data);
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setIsLoading(false)

      // console.log(values);
    },
    // validate:validate
    validationSchema: validate2

  });
  return (
    <div className="w-75 m-auto my-5">
      <h1>Login :</h1>
      <form onSubmit={handleSubmit} className="">
    
        <label htmlFor="email" className="my-1 mx-1">
          Email:
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
        />
        {errors.email && touched.email && (
          <p className="alert alert-danger">{errors.email}</p>
        )}
        <label htmlFor="password" className="my-1 mx-1">
          Password:
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          type="password"
          className="form-control mb-3"
          id="password"
          name="password"
        />
        {errors.password && touched.password && (
          <p className="alert alert-danger">{errors.password}</p>
        )}
    
    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ?
          <button disabled type="button" className="btn bg-success px-3 text-white ms-auto d-block"><i className="fas fa-spin fa-spinner"></i></button>
          :
          <button
            type="submit"
            className="btn bg-success px-3 text-white ms-auto d-block " disabled={!isValid || isLoading}
          >
            Login
          </button>
        }

      </form>
    </div>
  );
}
