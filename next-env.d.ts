/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="react-scripts" />

declare module '@jam3/react-hooks' {
  export function useWindowSize(debounce: number): { innerWidth: number; innerHeight: number };
}

declare module 'get-scroll' {
  export function getScrollTop(): number;
}

declare module 'no-op' {
  export default function noop(): void;
}
