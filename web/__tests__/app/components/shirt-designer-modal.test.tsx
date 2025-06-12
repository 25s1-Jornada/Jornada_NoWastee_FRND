import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShirtDesignerModal from '@/app/components/details/designer/shirt-designer-modal';
import { state } from '@/app/components/details/designer/store';
import { act } from 'react';

vi.mock('@react-three/fiber', () => ({
    Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
    useFrame: () => null,
    group: ({ children, ...props }) => <div data-testid="camera-group" {...props}>{children}</div>,
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

vi.mock('@/app/components/details/designer/shirt-designer-modal', async () => {
    const actual = await vi.importActual<any>('@/app/components/details/designer/shirt-designer-modal');
    return {
      ...actual,
      CameraRig: ({ children }) => {
        return <div data-testid="camera-rig">{children}</div>;
      },
    };
  });

describe('ShirtDesignerModal', () => {
  beforeEach(() => {
    state.color = '#EFBD4E';
    state.decal = 'logo_nowastee';
    state.intro = false;
  });

    it('renderiza corretamente o modal com o canvas e os elementos 3D', () => {
        render(<ShirtDesignerModal open={true} onClose={() => {}} />);
    
        // Canvas renderizado
        expect(screen.getByTestId('canvas')).toBeInTheDocument();
    
        // Decal (mockado)
        expect(screen.getByTestId('decal')).toBeInTheDocument();
    
        // Verifica que o modal abriu
        expect(screen.getByText(/Personalizar Camiseta/i)).toBeInTheDocument();
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

  it('renderiza o CameraRig corretamente', () => {
    render(<ShirtDesignerModal open={true} onClose={() => {}} />);
    const groupElement = document.querySelector('group');
    expect(groupElement).toBeTruthy();
  });
  
});