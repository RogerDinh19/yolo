import React, { useState , useEffect} from 'react'

import Helmet from '../components/Helmet'
import numberWithCommas from '../numberToString/numberWithCommas'
import Button from '../components/Button'
import CartItem from '../components/CartItem'

import productData from '../assets/fake-data/products'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



function Cart() {

  const cartItems = useSelector((state) => state.cartItems.value)

  // console.log(productData.getCartItemsInfo(cartItems))

  const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems))
  
  const [totalProducts, setTotalProducts] = useState(0)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems))
    setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    setTotalPrice(cartItems.reduce((total ,item)=> total + (Number(item.quantity) *Number(item.price)), 0))
   
  }, [cartItems])

  return (
    <Helmet title="Giỏ hàng">
        <div className="cart">
            <div className="cart__info">
                <div className="cart__info__text">
                    <p>
                        Bạn đang có {totalProducts} sản phẩm
                    </p>
                    <div className="cart__info__text__price">
                        <span>Thành tiền</span>
                        <span>{numberWithCommas(totalPrice)}</span>
                    </div>
                </div>

                <div className="cart__info__btn">
                    <Button  size="block">
                        Đặt hàng
                    </Button>
                    <Link to="/catalog">
                        <Button size="block">Tiếp tục mua hàng</Button>
                    </Link>
                </div>
            </div>

            <div className="cart__list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index}/>
                        ))
                    }
            </div>
        </div>
    </Helmet>
  )
}

export default Cart