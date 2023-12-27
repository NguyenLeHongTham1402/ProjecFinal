import React from 'react';
import UsersList from './UsersList';
import { Routes, Route } from 'react-router-dom';
import EditUser from './EditUser';

function User() {
    return (
        <div>
            <Routes>
                <Route path='list' element={<UsersList/>}/>
                <Route path='edit/:id' element={<EditUser/>}/>
            </Routes>
        </div>
    );
}

export default User;