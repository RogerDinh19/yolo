import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/images/Logo-2.png'

import { useSelector } from 'react-redux'


const mainNav = [
  {
    display: "Trang chủ",
    path: "/"
  },
  {
      display: "Sản phẩm",
      path: "/catalog"
  },
  {
      display: "Phụ kiện",
      path: "/accessories"
  },
  {
      display: "Liên hệ",
      path: "/contact"
  }

]

function Header() {

  const {pathname} = useLocation();
  const activeNav = mainNav.findIndex(e => e.path === pathname)
  // Active main menu

  // Chức năng hiện sô hàng ở icon giỏ hàng
  const cartItems = useSelector((state) => state.cartItems.value)
  const [totalProducts, setTotalProducts] = useState(0)
  useEffect(() => {
    setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
  }, [cartItems])


  const headerRef = useRef(null)

  useEffect(() => {
    window.addEventListener("scroll", () =>{
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('shrink')
      }else{
        headerRef.current.classList.remove('shrink')
      }
    })

    return () => {
      window.removeEventListener("scroll")
    }
  }, [])
  // handle scroll header events

  // handle toggle menu tablet
  const menuLeft = useRef(null)
  const menuToggle = () => menuLeft.current.classList.toggle('active')

  const clickToTop = () => {
    window.scrollTo(0, 0)
  }
  return (
      <div className="header" ref={headerRef}>
        <div className="container">
          {/* logo  */}
          <div className="header__menu">
            <div className="header__logo">
              <Link to="/" onClick={clickToTop}>
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="header__menu__left" ref={menuLeft}>
              <div className="header__menu__left__close" onClick={menuToggle}>
                <i className='bx bx-exit'></i>
              </div>
              {
                  mainNav.map((item,index) =>(
                    <div 
                      key={index} 
                      className={`header__menu__item header__menu__left__item 
                                  ${index === activeNav ? 'active' : ''}`}
                      onClick={menuToggle}                     
                    >
                      <Link to={item.path}>
                        <span>{item.display}</span>
                      </Link>
                    </div>
                  ))
              }
            </div>
            <div className="header__menu__right">
              <div className="header__menu__item header__menu__right__item">
                <i className='bx bx-search-alt-2' ></i>
              </div>

              <div className="header__menu__item header__menu__right__item">
                <Link to="/cart">
                  <i className='bx bx-cart'>
                    <span className='header__menu__item__total_card'>{totalProducts}</span>
                  </i>
                </Link>
              </div>

              <div className="header__menu__item header__menu__right__item">
                <Link to="/login">
                  <i className='bx bxs-user' ></i>
                </Link>
              </div>

              <div className="header__menu__mobile-toggle" onClick={menuToggle}>
              <i className='bx bx-menu' ></i>
              </div>
            </div>
          </div>

        </div>
      </div>
  )
}

export default Header
