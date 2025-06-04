'use client';

import Image from 'next/image';
import { ShoppingCart} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="text-2xl font-dm-sans flex justify-between items-center mb-12 px-8 md:px-16 py-10 fixed left-0 top-0 z-10 w-full bg-background">
      <div className="flex gap-10 text-neutral-600">
        <a href="#" className="hover:underline">t-shirts</a>
        <a href="#" className="hover:underline">tech</a>
        <a href="#" className="hover:underline">about us</a>
      </div>

      <Image
        src={'/images/logo.png'}
        alt={'logo'}
        width={240}
        height={100}
        className="h-auto object-cover"
      />

      <div className="flex gap-10 items-center">
        <a href="#">zero waste</a>
        <a href="#">movement</a>
        <button aria-label="Cart">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
