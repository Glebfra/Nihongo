import type { ReactNode } from "react";

export interface PillCardProps {
    className?: string;
    children?: ReactNode;
}

export interface PillCardContentProps {
    children: ReactNode;
}

export interface PillCardActionProps {
    children: ReactNode;
}

export const PillCard = ({children, className = ""}: PillCardProps): ReactNode => {
    return (
        <div className="flex justify-center w-full">
            <div
                className={`
        inline-flex
        items-center
        gap-4
        rounded-full
        border border-white/10
        bg-white/70 dark:bg-black/40
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        px-6 py-3
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-xl
        ${className}
        `}
            >
                {children}
            </div>
        </div>
    );
};

export const PillCardContent = ({children}: PillCardContentProps): ReactNode => {
    return (
        <div className="text-sm text-foreground/80">
            {children}
        </div>
    );
};

export const PillCardAction = ({children}: PillCardActionProps): ReactNode => {
    return (
        <button
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition hover:scale-105 hover:shadow-md">
            {children}
        </button>
    );
};
