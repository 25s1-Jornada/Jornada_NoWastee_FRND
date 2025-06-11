import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from '@/app/components/navbar';

describe('Navbar', () => {
  it('renders navigation links and cart button', () => {
    render(<Navbar />);

    // Verifica os links principais
    expect(screen.getByText('t-shirts')).toBeInTheDocument();
    expect(screen.getByText('tech')).toBeInTheDocument();
    expect(screen.getByText('about us')).toBeInTheDocument();
    expect(screen.getByText('zero waste')).toBeInTheDocument();
    expect(screen.getByText('movement')).toBeInTheDocument();

    // Verifica se o botão do carrinho existe
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();

    // Verifica se a imagem do logo está presente
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });
});
