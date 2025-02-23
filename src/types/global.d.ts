import { NextComponentType, NextPageContext } from 'next';

declare module '*.svg' {
    import { FC, SVGProps } from 'react'
    const content: FC<SVGProps<SVGElement>>
    export default content
}
  
declare module '*.svg?url' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any
    export default content
}

export interface Link {
    rel: string;
    href: string;
    crossOrigin?: string;
    type?: string;
    sizes?: string;
}

// Define a custom type for page components with an optional noLayout property
export type CustomPageComponent = NextComponentType<NextPageContext, any, any> & {
  noLayout?: boolean;
};