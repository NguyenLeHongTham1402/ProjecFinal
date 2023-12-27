import React from 'react';
import './style.scss'
import {FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, } from '@ant-design/icons'

function Footer() {
    return (
        <div className='footer'>
            <ul className='footer_sec01'>
                <li>
                    <ul className='footer_sec01__sub'>
                        <li>Copyright &copy; 2023, T1 Shop All right reserved 2023</li>
                        <li className='footer__icon'>
                            <FacebookOutlined />
                            <InstagramOutlined />
                            <TwitterOutlined />
                            <YoutubeOutlined />
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='footer_sec01__sub'>
                        <li>LINKS</li>
                        <li>TERMS OF SERVICE</li>
                        <li>PRIVACY POLICY</li>
                    </ul>
                </li>
                <li>
                    <ul className='footer_sec01__sub'>
                        <li>INFORMATION</li>
                        <li>FAQ</li>
                        <li>RETURNS & EXCHANGES</li>
                        <li>CONTACT</li>
                    </ul>
                </li>
            </ul>

            <ul className='footer_sec02'>
                <li>&copy; T1 Shop</li>
                <li>Powered by Shopify</li>
            </ul>
        </div>
    );
}

export default Footer;