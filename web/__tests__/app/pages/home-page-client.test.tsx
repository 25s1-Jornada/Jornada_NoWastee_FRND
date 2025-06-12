import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePageClient from '@/app/components/home/home-page.client';

// Mock de produtos para o teste
const mockProducts = [
  {
    id: 1,
    name: 'Camiseta Branca',
    price: 'R$ 210,00',
    category: 'T-Shirts',
    image: '/products/a.jpg',
  },
  {
    id: 2,
    name: 'Camiseta Preta',
    price: 'R$ 270,00',
    category: 'T-Shirts',
    image: '/products/b.jpg',
  },
  {
    id: 3,
    name: 'Regata Preta',
    price: 'R$ 290,00',
    category: 'Tech',
    image: '/products/c.jpg',
  },
];

describe('HomePageClient', () => {
  it('filtra os produtos com base na busca e faixa de preço', () => {
    render(<HomePageClient initialProducts={mockProducts} />);

    // digita "camiseta" no campo de pesquisa
    const input = screen.getByPlaceholderText('Pesquisa...');
    fireEvent.change(input, { target: { value: 'Camiseta' } });

    // move o slider de preço para 250
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '250' } });

    // clica no botão de aplicar (ícone de lupa)
    const button = screen.getByLabelText('Aplicar filtro');
    fireEvent.click(button);

    expect(screen.getByText('Camiseta Branca')).toBeInTheDocument();
    expect(screen.queryByText('Camiseta Preta')).not.toBeInTheDocument();
    expect(screen.queryByText('Boné Preto')).not.toBeInTheDocument(); 
  });
});