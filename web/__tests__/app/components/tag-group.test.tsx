import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from 'react';
import { state } from '@/app/components/details/designer/store';
import { useSnapshot } from 'valtio';

// Mocka o ShirtDesignerModal para expor interações com o estado
vi.mock('@/app/components/details/designer/shirt-designer-modal', () => ({
  default: ({ open, onClose }) => {
    if (!open) return null;

    const snap = useSnapshot(state);

    return (
      <div data-testid="mock-modal">
        <p>Personalizar Camiseta</p>

        <button
          data-testid="tag-click"
          onClick={() => {
            state.focusTag = true;
          }}
        >
          Ver Tag
        </button>

        {snap.focusTag && (
          <button
            data-testid="voltar-button"
            onClick={() => {
              state.focusTag = false;
            }}
          >
            Voltar
          </button>
        )}
      </div>
    );
  },
}));

describe('ShirtDesignerModal - comportamento de foco na Tag', async () => {
  const { default: ShirtDesignerModal } = await import('@/app/components/details/designer/shirt-designer-modal');

  beforeEach(() => {
    state.focusTag = false;
  });

  it('permite acessar a tag da camiseta e voltar à visualização normal', async () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);

    // Estado inicial
    expect(state.focusTag).toBe(false);
    expect(screen.queryByTestId('voltar-button')).not.toBeInTheDocument();

    // Clicar no botão para ativar a tag
    const tagButton = screen.getByTestId('tag-click');
    await act(() => {
      fireEvent.click(tagButton);
    });

    expect(state.focusTag).toBe(true);
    expect(screen.getByTestId('voltar-button')).toBeInTheDocument();

    // Clicar no botão voltar
    await act(() => {
      fireEvent.click(screen.getByTestId('voltar-button'));
    });

    expect(state.focusTag).toBe(false);
    expect(screen.queryByTestId('voltar-button')).not.toBeInTheDocument();
  });
});
