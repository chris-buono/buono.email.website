import React, { ElementType, useRef, MouseEvent } from 'react';

interface OmniousFingerProps<E extends ElementType = 'a'> extends React.ComponentPropsWithoutRef<E> {
    as?: E;
    children: React.ReactNode;
}

const OmniousFinger = <E extends ElementType = 'a'>({
    as,
    children,
    className = '',
    ...props
}: OmniousFingerProps<E>) => {
    const Component = as || 'a';
    const ref = useRef<HTMLElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate relative position from the center (-1 to 1)
    const deltaX = ((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2);
    const deltaY = ((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2);
    const move = 10; // Adjust to control intensity of the shadow movement
    ref.current.style.setProperty('--shadow-x', `${deltaX * move}px`);
    ref.current.style.setProperty('--shadow-y', `${deltaY * move}px`);
    };

    const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--shadow-x', '0px');
    ref.current.style.setProperty('--shadow-y', '0px');
    };

    return (
    <Component
        ref={ref as React.Ref<any>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`finger-shadow ${className}`}
        {...props}
    >
        {children}
    </Component>
    );
};

export default OmniousFinger;
