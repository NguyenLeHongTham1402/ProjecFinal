import { Link} from "react-router-dom"
import { Container, NavBar, Header, SearchContainer, TextSearch, CartSection} from "./styled"
import { useDispatch, useSelector } from "react-redux"
import React, {useEffect, useState } from "react"
import '../Navigation/style.scss'
import { catesActions, catesSelectors} from '@/store/modules/category'
import SubNavigation from "./SubNavigation/SubNavigation"
import {cartSelectors} from '@/store/modules/shopping-cart'
import Cart from "../Cart/Cart"
import {numberFormat} from '@/utils/number'


function Navigation() {
    const dispatch = useDispatch()
    const categories = useSelector(catesSelectors.selectParentCates)
    const totalQty = useSelector(cartSelectors.selectShoppingCartCount)
    const carts = useSelector(cartSelectors.selectShoppingCartProducts)
    const totalOrder = useSelector(cartSelectors.selectShoppingCartTotal)
    const userItem = localStorage.getItem('current-user')

    const [subCateId, setSubCateId] = useState(1);
    const [x, setX] = useState(0);
    const [w, setW] = useState(0);
    const [hideSearch, setHideSearch]=useState(true)
    const [hideCart, setHideCart]=useState(true)
    const [currentUser, setCurrentUser]=useState({})

    //Call back list category when current user change
    useEffect(() => {  
        dispatch(catesActions.get())     
        if(userItem){           
            setCurrentUser(JSON.parse(userItem))         
        }         
    }, [userItem])

    const handleShowSubMenu = (id) => {
        const element = document.getElementById(`nav-item${id}`)
        const x = element.offsetLeft
        const w = element.offsetWidth
        setX(x)
        setW(w)
        setSubCateId(id)
        document.getElementById(`sub-cate${id}`).style.display = 'block'
    }

    const handleHideSubMenu = () => {
        document.getElementById(`sub-cate${subCateId}`).style.display = 'none'
    }

    const handleSearch = () => {
        setHideSearch(!hideSearch)
    }

    const handleCart = () => {
        setHideCart(!hideCart)
    }

    const handleLogout = () => {
        if(window.confirm('Do you really want to log out?'))
        {
            localStorage.removeItem('current-user')
            window.location.href='/'
        }
        
    }

    return (
        <Header>
            <NavBar>
                <li>
                    <select>
                        <option className="sl-item" value='en'>English</option>
                        <option className="sl-item" value='ko'>Korean</option>
                        <option className="sl-item" value='vi'>Vietnamese</option>
                    </select>
                </li>
                <li>
                    <Link to='/'>
                        <img src="https://shop-t1-na.gg/cdn/shop/files/T1_Logo_Vector__e2012c_130x@2x.png?v=1662060200" alt="logo" />
                    </Link>
                </li>
                <li>
                    <NavBar className="sub-nav">
                        {Object.entries(currentUser).length > 0 && (
                            <li>
                                <Link className="nav-avatar">
                                    <img width={40} height={40} src={currentUser.avatar} alt="avatar"/>
                                </Link>
                                {currentUser?.role=='ADMIN' && (
                                    <Link to={'/admin'}>Management</Link>
                                )}
                                <Link className="logout" onClick={handleLogout}>Log out</Link>
                            </li>
                        )}
                        {Object.entries(currentUser).length <= 0 && (
                            <li>
                                <Link to='login'>Account</Link>
                            </li>
                        )}
                        
                        <li>
                            <Link onClick={handleSearch}>Search</Link>
                        </li>
                        <li className="cart-item">
                            <Link onClick={handleCart}>Cart ({totalQty})</Link>
                        </li>
                    </NavBar>
                </li>
            </NavBar>

            <Container>
                <NavBar className="nav-items">
                    {
                        categories.map(c => (
                            <div onMouseLeave={handleHideSubMenu} key={c.id}>
                                <li id={`nav-item${c.id}`} onMouseOver={() => { handleShowSubMenu(c.id) }}>
                                    <Link to={'/?category='+c.name+'&n=C'+c.id}>
                                        {c.name}
                                    </Link>
                                </li>
                                <SubNavigation w={w} x={x} cateId={c.id}/>
                            </div>
                        ))
                    }
                </NavBar>
            </Container>

            <SearchContainer hidden={hideSearch}>
                <ul>
                    <li>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </li>
                    <li>
                        <TextSearch type="text" placeholder="Search..." name="name" autoComplete="off"/>
                    </li>
                    <li>
                        <i onClick={handleSearch} className="fa fa-times" aria-hidden="true"></i>
                    </li>
                </ul>
            </SearchContainer>
            
            <CartSection hidden={hideCart}>
                    <div className="cartHead">
                        <h1>Cart</h1>
                        <p>
                            <i onClick={handleCart} className="fa fa-times" aria-hidden="true"></i>
                        </p>
                    </div>
                    <hr/>
                    <div className="cartContent">
                        {carts.map(c => (
                            <Cart key={c.id} cart={c}/>
                        ))}
                    </div>
                    <div className="cartFooter">
                        <hr/>
                        <ul>
                            <li>Total: {numberFormat(totalOrder)} đ</li>
                            <li>
                                <button>Buy This Order + ({totalQty} Item)</button>
                            </li>
                        </ul>
                    </div>
                    
            </CartSection>
        </Header>
    )
}

export default Navigation