import { NextComponentType, NextPageContext } from 'next';

// Define a custom type for page components with an optional noLayout property
export type CustomPageComponent = NextComponentType<NextPageContext, any, any> & {
  noLayout?: boolean;
};