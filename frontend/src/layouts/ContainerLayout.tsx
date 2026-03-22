import type { ReactNode } from "react";

export interface ContainerLayoutProps {
    children: ReactNode;
    className?: string;
}

const ContainerLayout = ({children, className = ""}: ContainerLayoutProps): ReactNode => {
    return (
        <div
            className={`
        mx-auto
        w-full
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default ContainerLayout;