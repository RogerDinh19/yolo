import React, { useState, useEffect } from 'react'

import ProductView from './ProductView'

import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../redux/redux-modal/productModalSlice'

import productData from '../assets/fake-data/products'

function ProductViewModal() {



    const productSlug = useSelector((state) => state.productModal.value)

    const dispatch = useDispatch()

    const [product ,setProdcut] = useState(undefined)
    
    useEffect(() => {
      setProdcut(productData.getProductBySlug(productSlug))
    }, [productSlug])

    const handleStopModal = (e) => {
        e.stopPropagation()
    }
    //Xử lý khi Click vào sự overlay thì ẩn modal nhưng click vào bên trong không bị ẩn modal
    
    
  return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'} `} onClick={() => dispatch(remove())} >
            <div className="product-view__modal__content" onClick={handleStopModal}>
                <ProductView
                    product= {product}
                />

                <div className="product-view__modal__content__close">
                    <i className='bx bx-x' onClick={() => dispatch(remove())}></i>
                </div>
            </div>
        </div>
  )
}

export default ProductViewModal