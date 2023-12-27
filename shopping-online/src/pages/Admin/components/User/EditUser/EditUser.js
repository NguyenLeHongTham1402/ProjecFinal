import React, { useEffect, useState } from 'react';
import './style.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {userSvc} from '@/store/modules/user'
import { useParams } from 'react-router-dom';

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

function EditUser() {
    const params = useParams()
    const [user, setUser] = useState({})
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const setValueForm = (data) => {
        setValue('username', data.username, {shouldValidate:true})
        setValue('password', data.password, {shouldValidate:true})
        setValue('email', data.email, {shouldValidate:true})
        setValue('fullname', data.fullname, {shouldValidate:true})
        setValue('phone', data.phone, {shouldValidate:true})
        setValue('cardId', data.cardId, {shouldValidate:true})
        setValue('role', data.role, {shouldValidate:true})
        setValue('address', data.address, {shouldValidate:true})
    }

    const loadData = async() => {
        const data = await userSvc.getUsersById(params.id)       
        setValueForm(data)
        setUser(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    const onSubmit = async (data) => {
        
        let img_url = ''
        if(data.avatar.length > 0){
            const image = await userSvc.UploadFile(data.avatar)
            if(Object.entries(image).length > 0)
                img_url = image.secure_url
            else
                img_url='https://res.cloudinary.com/dp50hyprx/image/upload/v1702440578/u418inis0uvbkx8vkaoh.jpg'
        }else{
            img_url=user.avatar
        }
        
        const u = {
            ...data,
            avatar:img_url,
            isActive:true,
            id:user.id,
            createdAt:user.createdAt
        }
        console.log(u)
        const res = await userSvc.updateUser(u)
        if(Object.entries(res).length > 0){
            window.alert('Update Success')
        }
        reset()
    }

    return (
        <div className='editUser'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form className='fmEditUser' onSubmit={handleSubmit(onSubmit)} >
                <h3>Update Here</h3>
                <div className='secEditUser'>
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

                        <label>Role</label>
                        <select {...register("role")}>
                            <option value={'ADMIN'}>ADMIN</option>
                            <option value={'USER'}>USER</option>
                        </select>
                    </div>
                </div>


                <button type='submit'>Submit</button>
                {/* <div className="social">
                    <div className="go"><i className="fa fa-google" aria-hidden="true"></i>  Google</div>
                    <div className="fb"><i className="fa fa-facebook" aria-hidden="true"></i>  Facebook</div>
                </div> */}
            </form>
        </div>


    );
}

export default EditUser;