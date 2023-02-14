import React, { useCallback, useEffect, useRef, useState } from 'react'
import Helmet from '../components/Helmet'
import InfinityList from '../components/InfinityList'
import CheckBox from '../components/CheckBox'
import Button from '../components/Button'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'

function Catalog() {

    const initFilter = {
        category: [],
        color: [],
        size: [],
    }

    const productList = productData.getAllProducts()

    const [products, setProducts] = useState(productList)

    const [filter,setFilter] = useState(initFilter)

    // Tạo bộ lọc
    const filterSelect = (type, checked , item ) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter , category: [...filter.category , item.categorySlug]})
                    break
                case "COLOR":
                    setFilter({...filter , color: [...filter.color , item.color]})
                    break
                case "SIZE":
                    setFilter({...filter , size: [...filter.size , item.size]})
                    break
                
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY": 
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR": 
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({...filter, color: newColor})
                    break
                case "SIZE": 
                    const newSIze = filter.size.filter(e => e !== item.size)
                    setFilter({...filter, size: newSIze})
                    break
                
                default:
            }
        }
    }

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categorySlug))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.colors.find(color => filter.color.includes(color))
                    return check !== undefined
                })
            }

            if (filter.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.size.find(size => filter.size.includes(size))
                    return check !== undefined
                })
            }

            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])


    // Xóa bộ lọc
    const clearFilter = () => {
        return setFilter(initFilter)
    }

    // Handle click filter tablet
    const filterRef = useRef(null)
    const filterToggle = () => filterRef.current.classList.toggle('active')


    return (
        <Helmet title='San pham'>
            {
                console.log(filter)
            }
            <div className="catalog">
            <div className="catalog__filter" ref={filterRef}>
                <div className="catalog__filter__close" >
                    <i className='bx bx-chevrons-left' onClick={filterToggle}></i>
                </div>
                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__title">
                        Danh mục sản phẩm
                    </div>

                    <div className="catalog__filter__widget__content">
                        {
                            category.map((item, index) => (
                                <div 
                                    key={index}
                                    className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__title">
                        Màu sắc
                    </div>

                    <div className="catalog__filter__widget__content">
                        {
                            colors.map((item, index) => (
                                <div 
                                    key={index}
                                    className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__title">
                        Kích thước
                    </div>

                    <div className="catalog__filter__widget__content">
                        {
                            size.map((item, index) => (
                                <div 
                                    key={index}
                                    className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("SIZE", input.checked, item)}
                                            checked={filter.size.includes(item.size)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="catalog__filter__widget">
                    <div className="catalog__filter__widget__content">
                        <Button
                            size="sm"
                            icon="bx bx-trash"
                            animate={true}
                            onclick={clearFilter}
                        >
                            Xóa bộ lọc
                        </Button>
                    </div>
                </div>
            </div>

            <div className="catalog__filter__toggle" onClick={filterToggle}>
                <span>Bộ lọc</span>
                <i className='bx bx-filter-alt' ></i>
            </div>
            
            <div className="catalog__content">
                <InfinityList
                    data={products}
                
                />
            </div>
            </div>
        </Helmet>
    )
}

export default Catalog
