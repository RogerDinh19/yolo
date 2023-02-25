import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Header from './Header'
import Footer from './Footer'
import ProductViewModal from './ProductViewModal'

import Routes from '../routes/Routes'

function Layout() {
    return (
        <BrowserRouter>
            <Route render={props => (
                <div>
                    <Header {...props}/>
                    <div className="container">
                        <div className="main">
                            <Routes/>
                        </div>
                    </div>
                    <Footer/>
                    <ProductViewModal/>
                    <ToastContainer />
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
