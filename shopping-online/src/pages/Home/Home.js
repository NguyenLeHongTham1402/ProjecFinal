import { Link, Route, Routes } from 'react-router-dom'
import Products from './components/Products'
import Navigation from './components/Navigation'
import {Container} from './styled'
import ProductDetail from './components/Products/ProductDetail'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Register'
import Footer from './components/Footer'

function Home() {

    return (
            <Container>
                <Navigation/>
                <Routes>
                    <Route path='/' element={<Products/>}/>
                    <Route path='/product/:id' element={<ProductDetail/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>  
                <Footer/>                        
            </Container>
        
    )
}

export default Home