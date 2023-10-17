import React from 'react'
import './footer.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { offBack } from '../../redux/timKiemSlice'

const Footer = () => {
    const dispath = useDispatch()
    const handleTrangChu = () => {
        dispath(offBack())
    }
    const handleLinkActive = (event) => {
        //add className="active vào giúp minh"
    }
    return (
        <div id='footer'>
            <div className="container">
                <div className="content">
                    <NavLink to='/' activeClassName="active">
                        <div className="footerItem" onClick={handleTrangChu} >
                            <i className="fa-solid fa-house"></i>
                            <p>Trang chủ</p>
                        </div>
                    </NavLink>

                    <NavLink to='/danh-muc' activeClassName="active">
                        <div className="footerItem">
                            <i className="fa-solid fa-layer-group"></i>
                            <p>Danh mục</p>
                        </div>
                    </NavLink>

                    <NavLink to='/thuong-hieu' activeClassName="active">
                        <div className="footerItem">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <p>Thương hiệu</p>
                        </div>
                    </NavLink>

                    <NavLink to='/thong-bao' activeClassName="active">
                        <div className="footerItem">
                            <i className="fa-solid fa-bell"></i>
                            <p>Thông báo</p>
                        </div>
                    </NavLink>

                    <NavLink to='/tai-khoan' activeClassName="active">
                        <div className="footerItem">
                            <i className="fa-solid fa-user"></i>
                            <p>Tài khoản</p>
                        </div>
                    </NavLink>

                </div>
            </div>
        </div>
    )
}

export default Footer