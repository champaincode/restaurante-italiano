import { Hero } from '../components/Hero';
import { Heritage } from '../components/Heritage';
import { ProductShowcase } from '../components/ProductShowcase';
import { Collection } from '../components/Collection';

export function Home() {
  return (
    <>
      <Hero />
      <Heritage />
      <ProductShowcase />
      <Collection />
    </>
  );
}

