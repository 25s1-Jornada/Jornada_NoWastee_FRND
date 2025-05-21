import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import type { Product } from '@/lib/entities/product.interface';
import type { ProductListComponentProps } from '@/app/components/product-list';
import HomePage from '@/app/page';

// Mock components used inside the page
vi.mock('@/app/components/navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock('@/app/components/filter-sidebar', () => ({
  default: () => <aside data-testid="sidebar">FilterSidebar</aside>,
}));

vi.mock('@/app/components/product-list', () => ({
  default: ({ products }: ProductListComponentProps) => (
    <div data-testid="product-list">
      {products.map((p: Product) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  ),
}));

describe('HomePage', () => {
  it('renders the page with all main sections and products', async () => {
    render(await HomePage());

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();

    expect(screen.getByText('Mock Product')).toBeInTheDocument();
    expect(screen.getByText('Other Product')).toBeInTheDocument();
  });
});
