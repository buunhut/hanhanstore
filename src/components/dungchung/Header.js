import React from 'react'
import './header.scss'
import ShopName from './ShopName'
import Search from './Search'

const Header = () => {
    return (
        <div id='header'>
            <ShopName />
            <Search />
        </div>

    )
}

export default Header