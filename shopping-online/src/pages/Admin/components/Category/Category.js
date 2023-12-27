import { Route, Routes } from 'react-router-dom';
import CategoryList from './CategoryList';
import React from 'react';

function Category() {
    return (
        <div>
            <Routes>
                <Route path='list' element={<CategoryList/>}/>
            </Routes>
        </div>
    );
}

export default Category;