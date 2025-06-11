import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterSidebar from '@/app/components/filter-sidebar';

describe('FilterSidebar', () => {
  it('applies filter with correct values', () => {
    const mockOnFilter = vi.fn();

    render(
      <FilterSidebar
        onFilter={mockOnFilter}
        query=""
        range={[190, 300]}
      />
    );

    // Digita "camiseta" no campo de busca
    const input = screen.getByPlaceholderText("Pesquisa...");
    fireEvent.change(input, { target: { value: "camiseta" } });

    // Muda o valor do range para 250
    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: "250" } });

    // Clica no botão de aplicar (ícone de lupa)
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Verifica se a função foi chamada corretamente
    expect(mockOnFilter).toHaveBeenCalledWith("camiseta", [190, 250]);
  });
});
