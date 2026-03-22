import type { ReactNode } from "react";

export interface CardProps {
    children: ReactNode;
}

export interface CardHeaderProps {
    title: string;
    subtitle: string;
}

export interface CardContentProps {
    children: ReactNode;
}

export interface CardFooterProps {
    children: ReactNode;
}

export const Card = ({children}: CardProps): ReactNode => {
    return (
        <div
            className="
                group relative overflow-hidden rounded-2xl
                border border-border
                bg-background-secondary
                backdrop-blur-xl
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                "
        >
            {children}
        </div>
    );
};

export const CardHeader = ({title, subtitle}: CardHeaderProps): ReactNode => {
    return (
        <div className="border-b border-border px-6 py-4">
            <h3 className="text-lg font-semibold tracking-tight text-center">
                {title}
            </h3>

            {subtitle && (
                <p className="mt-1 text-sm text-foreground-muted">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export const CardContent = ({children}: CardContentProps): ReactNode => {
    return (
        <div className="px-6 py-5 text-sm text-foreground/80">
            {children}
        </div>
    );
};

export const CardFooter = ({children}: CardFooterProps): ReactNode => {
    return (
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
            {children}
        </div>
    );
};