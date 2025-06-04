import React from 'react';
import type { Product } from '@/lib/entities/product.interface';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductListComponentProps {
  products: Product[];
}

export default function ProductList({ products }: Readonly<ProductListComponentProps>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
      {products.map((product) => (
        <Link href={'pages/product'} key={product.id}>
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={800}
            className="w-full h-auto object-cover"
          />
          <p className="uppercase text-xs font-dm-sans tracking-wide text-gray-500 mt-2">{product.category}</p>
          <h2 className="text-neutral-900 font-playfair-display text-lg">{product.name}</h2>
          <p className="text-neutral-500 font-dm-sans">{product.price}</p>
        </div>
        </Link>
      ))}
    </div>
  );
}