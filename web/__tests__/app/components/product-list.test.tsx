import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ProductList from '@/app/components/product-list';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const mockProducts = [
  {
    id: 1,
    name: 'Product A',
    price: 'R$ 100,00',
    category: 'LINHA ART',
    image: '/products/a.jpg',
  },
  {
    id: 2,
    name: 'Product B',
    price: 'R$ 200,00',
    category: 'LINHA ART',
    image: '/products/b.jpg',
  },
];

describe('ProductList', () => {
  it('renders all product cards', () => {
    render(<ProductList products={mockProducts} />);

    const cards = screen.getAllByRole('link');
    expect(cards.length).toBe(mockProducts.length);

    cards.forEach((card, i) => {
      const utils = within(card);
      const product = mockProducts[i];
      expect(utils.getByText(product.name)).toBeInTheDocument();
      expect(utils.getByText(product.price)).toBeInTheDocument();
      expect(utils.getByText(product.category)).toBeInTheDocument();
    });
  });
});
