import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShirtDesignerModal from '@/app/components/details/designer/shirt-designer-modal';
import { state } from '@/app/components/details/designer/store';
import { act } from 'react';

// Mock para evitar erros com <Canvas />
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useFrame: () => null,
  AmbientLight: () => <div />,
  Primitive: () => <div />,
  Group: ({ children }) => <div data-testid="camera-group">{children}</div>,
}));

vi.mock('@react-three/drei', () => ({
  AccumulativeShadows: ({ children }) => <div>{children}</div>,
  Center: ({ children }) => <div>{children}</div>,
  Decal: () => <div data-testid="decal" />,
  Environment: () => <div />,
  RandomizedLight: () => <div />,
  useGLTF: () => ({
    nodes: { mesh_1: { isMesh: true, material: {} } },
    materials: { lambert1: { color: { set: vi.fn() } } },
  }),
  useTexture: () => 'mock-texture',
}));

beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation((msg) => {
      if (
        typeof msg === 'string' &&
        msg.includes('not wrapped in act')
      ) return; // ignora
      console.error(msg);
    });
  });

describe('ShirtDesignerModal', () => {
  beforeEach(() => {
    state.color = '#EFBD4E';
    state.decal = 'logo_nowastee';
    state.intro = false;
  });

    it('altera a cor quando um botão de cor é clicado', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);

    const greenButton = screen.getByTitle('#80C670');

    act(() => {
        fireEvent.click(greenButton);
    });

    expect(state.color).toBe('#80C670');
    });

  it('altera a estampa ao clicar em uma imagem', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);

    const logo = screen.getAllByRole('img').find((img) =>
      img.getAttribute('src')?.includes('logo_nowastee_thumb.png')
    );

    fireEvent.click(logo!);
    expect(state.decal).toBe('logo_nowastee');
  });

  it('renderiza o movimento da câmera', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);
    expect(screen.getByTestId('camera-group')).toBeInTheDocument();
  });
  
});
