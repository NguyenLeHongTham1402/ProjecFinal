import React from 'react';
import ProductsList from './ProductsList/ProductsList';
import { Route, Routes } from 'react-router-dom';
import CreateUpdate from './CreateUpdate';

function Products() {
    return (
        <div>
            <Routes>
                <Route path='list' element={<ProductsList/>}/>
                <Route path='add-update' element={<CreateUpdate/>}/>
            </Routes>
        </div>
    );
}

export default Products;