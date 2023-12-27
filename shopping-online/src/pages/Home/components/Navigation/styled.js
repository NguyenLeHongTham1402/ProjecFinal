import styled from "styled-components";

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    width: 100%;
    height: 170px;
`

const NavBar = styled.ul`
    margin: 0;
    padding-top: 35px;
    display: flex; 
    justify-content: space-around;
    align-items: center;
    background: #000;

    .sub-nav{
        padding: 0;
    }

    &.nav-items{
        padding-bottom: 25px;
        
        li{
            text-transform: uppercase;
            font-weight: 500;
            a{
                color: #fff;
                font-size: 16px;
            }
        }
    }

    li{
        list-style: none;
        a{
            padding: 25px 10px;
            text-decoration: none;    
            color: gray; 
            &:hover{
                color: #fff ;
            }      
        }
        img{
            max-width: 130px;
        }
        .cart-item > a{
            color: #fff;
        }
        select{
            padding: 5px 8px;
            border: none;
            background-color: #000; 
            color: gray; 
            text-transform: uppercase;
            width: 200px;
            .sl-item{
                background-color: #fff;
                color: #748391;
            }

            &:hover{
                color: #fff ;
            }  
            &:focus{
                outline: none;
            }       
        }
    }
`

const SubNav = styled.ul`
    position: absolute;
    left: ${prods => `${prods.$pos}px`};
    top:100%;
    border-top: 2px solid white;
    background: #000;
    min-width:${props => `${props.$width}px`};
    max-width:100%;
    border-radius:2px;
    display: none;

    li{
        padding:12px;
        a{
            text-decoration:none;
            color:#fff;
            &:hover{
                color:gray;
            }
        }
    }
`

const Container = styled.div`
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SearchContainer = styled.div`
    background: #fff;
    padding: 18px 50px;
    box-shadow: 10px 10px 25px #c8c8c8;
    ul{
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
        li:nth-child(2){
            flex: 2;
        }
    }
`
const TextSearch = styled.input`
    color: #000;
    padding: 10px;
    width: 100%;
    border: none;
    font-size: 20px;
    &:focus{
        outline: none;
    }
`

const CartSection = styled.div`
    width: 70vh;
    height: 100vh;
    background: white;
    box-shadow: 25px 10px 10px #c8c8c8;
    position: fixed;
    top:0;
    right: 0;
    overflow-y: scroll;
    hr{
        border: 1px solid #dcdcdc;
    }
`

export {
    NavBar,
    SubNav,
    Container,
    Header,
    SearchContainer,
    TextSearch,
    CartSection
}
