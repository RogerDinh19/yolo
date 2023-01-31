import React from 'react'
import { Link } from 'react-router-dom';

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, {SectionBody,SectionTitle} from '../components/Section';
import PolicyCard from '../components/PolicyCard';
import Grid from '../components/Grid';
import ProductCart from '../components/ProductCart';


import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy"
import productData from '../assets/fake-data/products';
import banner from "../assets/images/banner.png";

const Home = () => {
  return (
    <Helmet title="Trang chu">
        {/* slider */}
            <HeroSlider
              data={heroSliderData}
              control= {true}
              auto = {true}
            />
        {/* end slider */}

        {/* Section  */}
        <Section>
          <SectionBody>
            <Grid
              col={4}
              mdCol={2}
              smCol={1}
              gap={20}
            >
              {
                policy.map((item,index) => <Link to="/policy" key={index}>
                  <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                  />
                </Link>)
              }
            </Grid>
          </SectionBody>
        </Section>
        {/* End Section */}

        {/* Best selling section */}
        <Section>
          <SectionTitle>
            Top sản phẩm bán chạy
          </SectionTitle>
          <SectionBody>
            <Grid
              col={5}
              mdCol={2}
              smCol={1}
              gap={20}
            >
              {
                productData.getProducts(5).map((item,index) =>(
                  <ProductCart
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                  />
                ))
              }
            </Grid>
          </SectionBody>
        </Section>
        {/* End Best selling section */}

        {/* Banner */}
        <Section>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </Section>    
        {/* end banner */}
        
        {/* New product */}
        <Section>
          <SectionTitle>
            Sản phẩm phổ biến
          </SectionTitle>
          <SectionBody>
            <Grid
              col={5}
              mdCol={2}
              smCol={1}
              gap={20}
            >
              {
                productData.getProducts(10).map((item,index) =>(
                  <ProductCart
                    key={index}
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={Number(item.price)}
                    slug={item.slug}
                  />
                ))
              }
            </Grid>
          </SectionBody>
        </Section>
        {/* end new product */}
        
    </Helmet>
  )
}

export default Home
