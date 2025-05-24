// __tests__/setup-tests.ts
import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import type { ImgHTMLAttributes, ReactNode } from "react";
import { MockProductService } from './__mocks__/product-service.mock';

vi.mock('@/lib/factories/product-service.factory', () => {
  return {
    getProductService: () => new MockProductService(),
  };
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));
