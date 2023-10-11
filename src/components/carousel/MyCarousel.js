import React from 'react'
import './mycarousel.scss'

//Owl Carousel Libraries and Module
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useSelector } from 'react-redux';
import SanPhamItem from '../sanpham/SanPhamItem';

const MyCarousel = () => {
    const options = {
        margin: 10,
        responsiveClass: true,
        nav: false,
        autoplay: true,
        smartSpeed: 500,
        loop: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            576: {
                items: 3,
            },
            768: {
                items: 4,
            },
            992: {
                items: 5,
            },
            1200: {
                items: 6,
            },
        },
    };

    const { sanPham } = useSelector((state) => state.sanPham);
    const { gioHang } = useSelector((state) => state.gioHang);

    return (
        <div id='myCarousel'>
            <OwlCarousel className="slider-items owl-carousel"  {...options}>
                {sanPham?.map((item) => {
                    const sanPhamInCart = gioHang.some(
                        (cartItem) => cartItem.id === item.id
                    );
                    return (
                        <SanPhamItem
                            item={item}
                            inCart={sanPhamInCart}
                            key={item.id}
                        />
                    );
                })}
            </OwlCarousel>
        </div>
    )
}

export default MyCarousel