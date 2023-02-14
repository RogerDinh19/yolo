import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import numberWithCommas from '../numberToString/numberWithCommas'
import { withRouter } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addItem } from '../redux/shopping-cart/cartItemsSlide'

function ProductView(props) {

    const dispatch = useDispatch()


    let product = props.product

    if (product === undefined) product ={
        price: 0,
        title: '',
        colors: [],
        size: []
    }

    const [previewImg , setPreviewImg] = useState(product.image01)

    const [descriptionExpend, setDescriptionExpend] = useState(false)

    const [color, setColor] = useState(undefined)

    const [size, setSize] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    // Chọn số lượng
    const updateQuantity = (type) => {
        if(type === 'plus') {
            setQuantity(quantity + 1)
        }else{
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    // xử lý product khi render lại 
    useEffect(() => {
        setPreviewImg(product.image01)
        setQuantity(1)
        setColor(undefined)
        setColor(undefined)
    }, [product])
    
    // Thông báo khi chưa chọn size,color
    const check = () => {
        if (color === undefined) {
            alert('Vui lòng chọn màu sắc')
            return false
        }
        if (size ===undefined) {
            alert('Vui lòng chọn kích cỡ')
            return false
        }
        return true
    }

    // thêm vào giỏ hàng
    const addToCart = () =>{
        if (check() ) {
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price:product.price
            }))

            alert("Thêm thành công")
        }
    }

    // Mua ngay chuyển sang trang Card - dùng withRouter
    const goToCart = () => {
        if (check() ) {
            dispatch(addItem({
                slug: product.slug,
                color: color,
                size: size,
                quantity: quantity,
                price:product.price
            }))
            return props.history.push('/cart')
        }
    }

  return (
    <div className="product-main">
        <div className="product">
            <div className="product__image">
                <div className="product__image__list">
                    <div className="product__image__list__item" onClick={() => setPreviewImg(product.image01)}>
                        <img src={product.image01} alt="" />
                    </div>

                    <div className="product__image__list__item" onClick={() => setPreviewImg(product.image02)}>
                        <img src={product.image02} alt="" />
                    </div>
                    
                </div>

                <div className="product__image__main">
                    <img src={previewImg} alt="" />
                </div>
            </div>

            <div className="product__info">
                <h1 className="product__info__title">
                        {product.title}    
                </h1>  

                <div className="product__info__item">
                    <span className='product__info__item__price'>
                        {numberWithCommas(product.price)} đ
                    </span>
                </div>  

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>

                    <div className="product__info__item__list">
                        {
                            product.colors.map((item, index) => (
                                <div 
                                    className={`product__info__item__list__item ${color === item ? 'active' : ''}`} 
                                    key={index}
                                    onClick ={() => setColor(item)}
                                >
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>

                    <div className="product__info__item__list">
                        {
                            product.size.map((item, index) => (
                                <div 
                                    className={`product__info__item__list__item ${size === item ? 'active' : ''}`} 
                                    key={index}
                                    onClick ={() => setSize(item)}
                                >
                                    <span className="product__info__item__list__item__size">
                                        {item}
                                    </span>
                                    
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>

                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className='bx bx-plus'></i>
                        </div>
                    </div>
                </div>

                <div className="product__info__item">
                    <Button 
                        size='sm'
                        onclick={() => addToCart()}
                    >
                            Thêm vào giỏ hàng
                    </Button>
                    <Button
                        size='sm'
                        onclick={() => goToCart()}
                    >
                        Mua ngay
                    </Button>
                </div>
            </div>
        </div>
        
        <div className={`product__description ${descriptionExpend ? 'expand' : ''}`}>
                <div className="product__description__title">
                    Chi tiết sản phẩm
                </div>

                <div className="product__description__content" dangerouslySetInnerHTML={{
                        __html:product.description
                    }}>
                </div>

                {/* <div className="product__description__toggle">
                    <Button
                        size="sm"
                        onclick={() => setDescriptionExpend(!descriptionExpend)}
                    >
                        {
                            descriptionExpend ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div> */}
            </div>
    </div>
  )
}

ProductView.propTypes = {
    product: PropTypes.object,

}

export default withRouter(ProductView) 
