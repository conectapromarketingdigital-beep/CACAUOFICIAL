import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BannerCarousel from './components/BannerCarousel';
import ProductGrid from './components/ProductGrid';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PurchaseNotification from '../../components/PurchaseNotification';
import { products, featuredProducts } from '../../mocks/products';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <BannerCarousel />
      <ProductGrid products={products} />
      <ProductGrid products={featuredProducts} featured />
      <ContentSection />
      <ScrollToTop />
      <Footer />
      <PurchaseNotification />
    </div>
  );
}