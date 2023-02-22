import React, { useCallback, useEffect, useState } from "react";
import ScrollReveal from 'scrollreveal';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "./Button";

function HeroSlider(props) {

    const data = props.data
    // console.log(data);

    const timeOut = props.timeOut ? props.timeOut : 6000

    const [activeSlider, setActiveSlider] = useState(0)

    const nextSlider = useCallback(
        () => {
            const number = activeSlider + 1 === data.length ? 0 : activeSlider + 1
            setActiveSlider(number)
        }, [activeSlider,data]
    )
    // su kien next slider khi click va tu next anh tu dong

    const prevSlider = () => {
        const number = activeSlider -1 < 0 ? data.length -1 : activeSlider - 1
        setActiveSlider(number)
    }
    // su kien prev slider khi click

    useEffect(() => {
        if(props.auto) {
            const sliderAuto = setInterval(() => {
                nextSlider()
            },timeOut)

            return () => {
                clearInterval(sliderAuto)
            }
        }
    }, [nextSlider,timeOut,props])
    // auto slideshow

    useEffect(() => {
        ScrollReveal().reveal('.hero-slider__item__info', { delay: 1, origin: 'left',duration: 1000,distance: '60px', });
        ScrollReveal().reveal('.hero-slider__item__image', { delay: 1, origin: 'right',duration: 1000,distance: '60px' });
      }, []);


    return (
        <div className="hero-slider">
            {
                data.map((item, index) => (
                    <HeroSliderItem 
                        key = {index}
                        item={item}
                        active={index === activeSlider}
                    />
                ))
            }

            {
                props.control ? (
                    <div className="hero-slider__control">
                        <div className="hero-slider__control__item" onClick={prevSlider}>
                            <i className="bx bx-chevron-left"></i>
                        </div>

                        <div className="hero-slider__control__item">
                            <div className="hero-slider__control__number">
                                {activeSlider + 1 } / {data.length}
                            </div>
                        </div>

                        <div className="hero-slider__control__item" onClick={nextSlider}>
                            <i className="bx bx-chevron-right"></i>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}


HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}

const HeroSliderItem = props => (
    <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
        <div className="hero-slider__item__info">
            <div className={`hero-slider__item__info__title`} >
                <span style={{color:props.item.color}}>{props.item.title}</span>
            </div>
            <div className="hero-slider__item__info__description">
                <span>{props.item.description}</span>
            </div>
            <div className="hero-slider__item__info__btn">
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.color}
                        icon="bx bx-cart"
                        animate ={true}
                    >
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>

        <div className="hero-slider__item__image">
            <div className={`shape bg-${props.item.color}`}></div>
            <img src={props.item.img} alt="van ban thay the" />
        </div>
    </div>
)
export default HeroSlider;