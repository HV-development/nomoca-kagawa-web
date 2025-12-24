// 開発環境で node_modules が未インストールな場合の簡易型定義
// ※本来は pnpm install で公式の型を利用してください

declare module "react" {
  export as namespace React

  export type ReactNode = any
  export type SetStateAction<S> = S | ((prev: S) => S)
  export type Dispatch<A> = (value: A) => void
  export type FormEvent<T = any> = {
    target: T
    preventDefault(): void
  }
  export type ChangeEvent<T = any> = {
    target: T
  }
  export interface SyntheticEvent<T = any> {
    target: T
    currentTarget?: T
    preventDefault(): void
    stopPropagation(): void
  }
  export interface MouseEvent<T = any> extends SyntheticEvent<T> { }
  export interface MutableRefObject<T> {
    current: T
  }
  export interface HTMLAttributes<T> {
    [key: string]: any
  }
  export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    src?: string
    alt?: string
    width?: number | string
    height?: number | string
    loading?: "lazy" | "eager"
    decoding?: "async" | "auto" | "sync"
  }
  export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string
    target?: string
    rel?: string
  }
  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): any
  }
  export function useState<S = any>(
    initialState: S | (() => S)
  ): [S, (value: SetStateAction<S>) => void]
  export function useEffect(effect: (...args: any[]) => any, deps?: any[]): void
  export function useRef<T = any>(initialValue: T | null): MutableRefObject<T>
  export function useMemo<T = any>(factory: () => T, deps: any[]): T
  const React: { createElement: any }
  export default React
}

declare module "react/jsx-runtime" {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}

declare module "next/image" {
  import type * as React from "react"
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fill?: boolean
    quality?: number | string
    priority?: boolean
    placeholder?: "blur" | "empty"
    blurDataURL?: string
    unoptimized?: boolean
  }
  const Image: React.FC<ImageProps>
  export default Image
}

declare module "next/link" {
  import type * as React from "react"
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    prefetch?: boolean
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    locale?: string | false
  }
  const Link: React.FC<LinkProps>
  export default Link
}

declare module "next/navigation" {
  export function useRouter(): {
    push: (url: string) => void
    replace: (url: string) => void
    back: () => void
    forward: () => void
    refresh: () => void
    prefetch: (url: string) => Promise<void>
  }
  export function useSearchParams(): URLSearchParams
}

declare module "@hv-development/schemas" {
  export const UseRregistrationCompleteSchema: { parse: (value: unknown) => any }
  export type UserRegistrationComplete = {
    email?: string
    token?: string
    nickname: string
    postalCode: string
    address: string
    birthDate: string
    gender: "male" | "female" | "other"
    phone?: string
    mydigiAppId?: string
    referrerUserId?: string
    password: string
    passwordConfirm: string
    shopId?: string
  }
}

declare global {
  namespace JSX {
    interface Element { }
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export { }
