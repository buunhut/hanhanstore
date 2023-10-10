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
    return (
        <div id='footer'>
            <div className="container">
                <div className="content">
                    <NavLink to='/'>
                        <div className="footerItem" onClick={handleTrangChu} >
                            <i className="fa-solid fa-house"></i>
                            <p>Trang chủ</p>
                        </div>
                    </NavLink>

                    <NavLink to='/danh-muc'>
                        <div className="footerItem">
                            <i className="fa-solid fa-layer-group"></i>
                            <p>Danh mục</p>
                        </div>
                    </NavLink>

                    <NavLink to='/thuong-hieu'>
                        <div className="footerItem">
                            <i className="fa-solid fa-bag-shopping"></i>
                            <p>Thương hiệu</p>
                        </div>
                    </NavLink>

                    <NavLink to='/thong-bao'>
                        <div className="footerItem">
                            <i className="fa-solid fa-bell"></i>
                            <p>Thông báo</p>
                        </div>
                    </NavLink>

                    <NavLink to='/tai-khoan'>
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