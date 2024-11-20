import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // function register(e){
  //     e.preventDefault()
  //     console.log('hi');
  // }
  const validate2 = Yup.object({
    name: Yup.string().required('name is required').min(3, 'min length must be more than 3 Characters').max(20, 'max length must be less than 20 Characters'),
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'enter a valid email'),
    password: Yup.string().required('password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'password must not less than 8 characters and includes capital letter'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')]),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'enter valid phone number')
  })

  // validation without using yup library================================>
  function validate(values) {
    const errors = {};
    if (values.name == '') {
      errors.name = 'name is required';
    } else if (values.name.length < 3) {
      errors.name = 'min length must be more than 3 Characters'
    } else if (values.name.length > 20) {
      errors.name = 'max length must be less than 20 Characters'
    }

    if (values.email == '') {
      errors.email = 'Email is required';
    }
    else if (!(/^ [a - zA - Z0 -9._ % +-] + @[a - zA - Z0 - 9. -] +\.(com | net | org)$/).test(values.email)) {
      errors.email = 'Enter valid email'
    }

    if (values.password == '') {
      errors.password = 'Password is required';
    }
    else if (!(/^ (?=.* [A - Z])(?=.*\d).{ 8, 16 }$/).test(values.password)) {
      errors.password = 'password must not less than 8 characters and capital letter '
    }

    if (values.rePassword == '') {
      errors.rePassword = 'rePassword is required';
    } else if (values.password != values.rePassword) {
      errors.rePassword = 'rePassword and password does not match'
    }
    if (values.phone == '') {
      errors.phone = 'phone is required';
    } else if (!(/^01[0125][0-9]{8}$/).test(values.phone)) {
      errors.phone = 'phone number is invalid'
    }
    console.log(errors);
    return errors;


  }


  // Formik library to handel form============================>
  const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: async () => {
      setErrorMsg('');
      // start fetching Api 

      try {
        setIsLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        if (data.message == 'success') {
          navigate('/login')
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
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="">
        <label htmlFor="name" className="my-1 mx-1">
          Name:
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          type="text"
          className="form-control mb-3"
          id="name"
          name="name"
        />
        {errors.name && touched.name && (
          <p className="alert alert-danger">{errors.name}</p>
        )}
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
        <label htmlFor="rePassword" className="my-1 mx-1">
          Repassword:
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.rePassword}
          type="password"
          className="form-control mb-3"
          id="rePassword"
          name="rePassword"
        />
        {errors.rePassword && touched.rePassword && (
          <p className="alert alert-danger">{errors.rePassword}</p>
        )}
        <label htmlFor="phone" className="my-1 mx-1">
          Phone:
        </label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.phone}
          type="tel"
          className="form-control mb-3"
          id="phone"
          name="phone"
        />
        {errors.phone && touched.phone && (
          <p className="alert alert-danger">{errors.phone}</p>
        )}

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ?
          <button disabled type="button" className="btn bg-success px-3 text-white ms-auto d-block"><i className="fas fa-spin fa-spinner"></i></button>
          :
          <button
            type="submit"
            className="btn bg-success px-3 text-white ms-auto d-block " disabled={!isValid || isLoading}
          >
            Register
          </button>
        }

      </form>
    </div>
  );
}
