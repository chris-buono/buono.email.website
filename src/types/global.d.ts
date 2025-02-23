/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, MouseEventHandler } from 'react';
import { NextComponentType, NextPageContext } from 'next';

declare module '*.svg' {
    import { FC, SVGProps } from 'react'
    const content: FC<SVGProps<SVGElement>>
    export default content
}
  
declare module '*.svg?url' {
    const content: any
    export default content
}

export interface LinkType {
    rel: string;
    href: string;
    crossOrigin?: string;
    type?: string;
    sizes?: string;
}

// Component Props Example
export interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}
export interface TimeDisplayProps {
    epochTime?: number;
    isSeconds?: boolean;
    forceFormat?: string;
    setPreface?: string;
    setPostface?: string;
    live?: boolean;
}

export interface ExternalLink {
    text: string;
    href: string;
    isAffiliate: boolean;
}
  
export interface Download {
    label: string;
    url: string;
}

export interface Media {
    images: string[];
    videoUrl?: string;
    stlUrl?: string;
    externalLinks?: ExternalLink[];
    downloads?: Download[];
}

export interface ImageProps {
    src: string;
    alt: string;
}

export interface Project {
  title: string;
  subtitle: string;
  media: {
    images: ImageProps[];
    videoUrl?: string;
    stlUrl?: string;
    externalLinks?: ExternalLink[];
    downloads?: Download[];
  };
  steps: string[];
  textContent: string;
  stats?: Record<string | Node, string | Node>;
  description: string;
  navigation?: string;
}

export interface BaseMetadataProps {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
}

declare global {
    type GlobalErrorHandler = (error: Error) => void;

    type Email = {
        id: number;
        thumbnail: string;
        tags: string[];
        subject: string;
        sender: string;
        description: string;
        content: string;
        inboxDate?: TimeDisplayProps;
        private?: boolean;
    };

    type AsideMenu = {
        id: number;
        navigation: string;
        icon?: IconType;
        setNotice?: string;
        linkTitle?: string;
    };

}

export type CustomPageComponent = NextComponentType<NextPageContext, any, any> & {
  noLayout?: boolean;
};