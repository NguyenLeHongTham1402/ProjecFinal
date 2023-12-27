import React from 'react';
import './style.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {userSvc} from '@/store/modules/user'

//Config Check Valid Form Data
const schema = yup.object().shape({
    username: yup.string().required('You have not entered username yet!'),
    password: yup.string().required('You have not entered password yet!')
                .min(8,'Password has at least 8 characters'),
    email: yup.string().required('You have not entered email yet!')
            .matches(
                /\S+@\S+\.\S+/,
                'Wrong email format!'
            ),
    fullname: yup.string().required('You have not entered fullname yet!'),
    address: yup.string().required('You have not entered address yet!'),
    phone: yup.string().required('You have not entered username yet!')
        .matches(
            /^[0-9]+$/,
            'Wrong phone format!'
        ),
    cardId: yup.string().required('You have not entered identity card yet!'),

}).required()

function Register() {

    //Config Check Valid Form Data
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    //Function
    const onSubmit = async (data) => {
        let img_url = ''
        if(data.avatar.length > 0){
            const image = await userSvc.UploadFile(data.avatar)
            if(Object.entries(image).length > 0)
                img_url = image.secure_url
            else
                img_url='https://res.cloudinary.com/dp50hyprx/image/upload/v1702440578/u418inis0uvbkx8vkaoh.jpg'
        }else{
            img_url='https://res.cloudinary.com/dp50hyprx/image/upload/v1702440578/u418inis0uvbkx8vkaoh.jpg'
        }
        
        const user = {
            ...data,
            avatar:img_url,
            isActive:true,
            role:'USER'
        }
        const res = await userSvc.addUser(user)
        if(Object.entries(res).length > 0){
            window.alert('Register Success')
        }
        else{
            window.alert('Register Failure!')
        }
        reset()
    }

    //Return html component
    return (
        <div className='register'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form className='fmRegister' onSubmit={handleSubmit(onSubmit)} >
                <h3>Register Here</h3>
                <div className='secRegister'>
                    <div>
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

                        <label>Email</label>
                        <input id='email' type="email" {...register("email")} placeholder="Email" autoComplete='off' />
                        {errors.email?.message && (
                            <p className='error'>{errors.email?.message}</p>
                        )}

                        <label>Avatar</label>
                        <input id='avatar' type="file" {...register("avatar")} placeholder="Avarar" />
                    </div>
                    <div>
                        <label>Fullname</label>
                        <input id='fullname' type="text" {...register("fullname")} placeholder="Fullname" autoComplete='off' />
                        {errors.fullname?.message && (
                            <p className='error'>{errors.fullname?.message}</p>
                        )}

                        <label>Address</label>
                        <input id='address' type="text" {...register("address")} placeholder="Address" autoComplete='off'/>
                        {errors.address?.message && (
                            <p className='error'>{errors.address?.message}</p>
                        )}

                        <label>Phone</label>
                        <input id='phone' type="text" {...register("phone")} placeholder="Phone" autoComplete='off' />
                        {errors.phone?.message && (
                            <p className='error'>{errors.phone?.message}</p>
                        )}

                        <label>Identity Card</label>
                        <input id='cardId' type="text" {...register("cardId")} placeholder="Identity Card" autoComplete='off'/>
                        {errors.cardId?.message && (
                            <p className='error'>{errors.cardId?.message}</p>
                        )}
                    </div>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>


    );
}

export default Register;