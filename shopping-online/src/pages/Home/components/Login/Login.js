import React, { useState } from 'react';
import './style.scss'
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {userSvc} from '@/store/modules/user'
import {GooglePlusOutlined, FacebookOutlined} from '@ant-design/icons'

//Config Check Form Data
const schema = yup.object().shape({
    username: yup.string().required('You have not entered username yet!'),
    password: yup.string().required('You have not entered password yet!')
}).required()

function Login() {
    //Config Form Data
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    //Submit Login
    const onSubmit = async(data) => {
        console.log('Data: ', data)
        const result = await userSvc.CheckLogin(data)
        if(Object.entries(result).length > 0){
            if(result.role==='ADMIN'){
                window.location.href='/admin'
            }
            else
                window.location.href='/'
        }
        else{
            window.alert('Login Failure!!')
        }
        reset()
    }

    //Return html component
    return (
        <div className='login'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form className='loginFm' onSubmit={handleSubmit(onSubmit)} >
                <h3>Login Here</h3>

                <label>Username</label>
                <input id='username' type="text" {...register("username")} placeholder="Username" autoComplete='off' />
                {errors.username?.message && (
                    <p className='error'>{errors.username?.message}</p>
                )}

                <label>Password</label>
                <input id='password' type="password" {...register("password")} placeholder="Password" />
                {errors.password?.message && (
                    <p className='error'>{errors.password?.message}</p>
                )}

                <p className='regForm'>
                    <span>Do you have account? </span>
                    <span>
                        <Link className='register' to={'/register'}>Register</Link>
                    </span>
                </p>

                <button type='submit'>Log In</button>
                <div className="social">
                    <div className="go"><GooglePlusOutlined />  Google</div>
                    <div className="fb"><FacebookOutlined />  Facebook</div>
                </div>
            </form>
        </div>
    );
}

export default Login;