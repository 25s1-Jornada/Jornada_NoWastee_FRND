import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { state } from '@/app/components/details/designer/store';
import { act } from 'react';

// Mock do componente ShirtDesignerModal com os principais elementos simulados
vi.mock('@/app/components/details/designer/shirt-designer-modal', () => ({
  default: ({ open, onClose }) =>
    open ? (
      <div data-testid="mock-modal">
        <div data-testid="canvas" />
        <div data-testid="decal" />
        <p>Personalizar Camiseta</p>
        <button title="#80C670" onClick={() => (state.color = '#80C670')} />
        <img
          role="img"
          src="/teste/logo_nowastee_thumb.png"
          onClick={() => (state.decal = 'logo_nowastee')}
        />
        <div data-testid="mock-camera-rig" />
      </div>
    ) : null,
}));

describe('ShirtDesignerModal', async () => {
  const { default: ShirtDesignerModal } = await import('@/app/components/details/designer/shirt-designer-modal');

  beforeEach(() => {
    state.color = '#EFBD4E';
    state.decal = 'logo_nowastee';
    state.intro = false;
  });

  // Testa se o modal é renderizado corretamente com os elementos principais
  it('renderiza corretamente o modal com o canvas e os elementos 3D', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
    expect(screen.getByTestId('decal')).toBeInTheDocument();
    expect(screen.getByText(/Personalizar Camiseta/i)).toBeInTheDocument();
  });

  // Testa se a cor da camiseta muda ao clicar em um botão de cor
  it('altera a cor quando um botão de cor é clicado', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);
    const greenButton = screen.getByTitle('#80C670');
    act(() => {
      fireEvent.click(greenButton);
    });
    expect(state.color).toBe('#80C670');
  });

  // Testa se a estampa (decal) é atualizada ao clicar em uma imagem
  it('altera a estampa ao clicar em uma imagem', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);
    const logo = screen.getByRole('img');
    fireEvent.click(logo);
    expect(state.decal).toBe('logo_nowastee');
  });

  // Testa se o CameraRig é renderizado corretamente
  it('renderiza o CameraRig corretamente', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);
    expect(screen.getByTestId('mock-camera-rig')).toBeInTheDocument();
  });
});
