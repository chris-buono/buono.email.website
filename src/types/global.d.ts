/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, MouseEventHandler } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { StaticImageData } from 'next/image';

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
    label?: string;
    url: string;
    isAffiliate: boolean;
    afterLinkText?: string;
    beforeLinkText?: string;
}
  
export interface Download {
    label: string;
    url: string;
}

export interface ImageProps {
    src: string | StaticImageData;
    alt: string;
    quality?: number;
    fill?: boolean;
    placeholder?: string;
    customClasses?: string;
    unoptimized?: boolean;
    priority?: boolean;
}
interface ProfileImageProps extends ImageProps {
    mediaDuration?: number;
    type?: 'random';
    notificationType?: string;
}

export interface CarouselProps {
    images: ImageProps[];
    alt?: string;
    className?: string;
}

export interface Media {
    images: ImageProps[];
    videoUrl?: string;
    stlUrl?: string;
    externalLinks?: ExternalLink[];
    downloads?: Download[];
  };

export interface Project {
  title: string;
  subtitle: string;
  media: Media;
  description: string;
  textContent: string;
  textContentTitle?: string;
  textContentExt?: string;
  textContentExtTitle?: string;
  steps?: string[];
  stats?: Record<string | Node, string | Node>;
  navigation?: string;
}

export interface BaseMetadataProps {
    title?: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
}

export interface Email {
    id: string
    thumbnail: string;
    tags: string[];
    subject: string;
    sender: string;
    content?: string;
    snippet: string;
    inboxDate?: TimeDisplayProps;
    private?: boolean;
    date?: number;
}

export interface EmailTypes {
    type: 'inbox' | 'spam' | 'important' | 'sent' | 'drafts' | 'trash' | 'notes';
}

export interface EmailApiResponse {
    emails: Email[];
    hasMore: boolean;
}
  
export interface EmailApiResponse {
    emails: Email[];
    hasMore: boolean;
}

declare global {
    type GlobalErrorHandler = (error: Error) => void;

    type AsideMenu = {
        id: number;
        navigation: string;
        icon?: IconType;
        setNotice?: string;
        linkTitle?: string;
    };

}

export type CodeBlockProps = {
    /**
     * The code string to be highlighted.
     */
    code: string;
  
    /**
     * The language of the code for syntax highlighting (e.g., 'javascript', 'typescript').
     */
    lang: string;
  
    /**
     * The Shiki theme for highlighting (e.g., 'nord', 'monokai').
     * Defaults to 'nord'.
     */
    theme?: string;
  
    /**
     * Whether to display line numbers.
     * Defaults to false.
     */
    showLineNumbers?: boolean;
  
    /**
     * Additional Tailwind CSS classes for the container.
     * Defaults to ''.
     */
    className?: string;
};

export type CustomPageComponent = NextComponentType<NextPageContext, any, any> & {
  noLayout?: boolean;
};