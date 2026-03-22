import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownProps {
    label: string;
    children: ReactNode;
}

export interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
}

export const Dropdown = ({label, children}: DropdownProps): ReactNode => {
    const [ open, setOpen ] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="
                inline-flex items-center justify-center gap-2
                rounded-full
                border border-border
                bg-background-secondary
                backdrop-blur-xl
                px-4 py-2
                text-sm
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                hover:bg-primary
                hover:text-primary-foreground
                transition-all duration-300
                "
            >
                {label}
                <span className="justify-center items-center">
                    <ChevronDown className="size-auto"/>
                </span>
            </button>

            <div
                className={`
                absolute right-0 mt-3
                min-w-[200px]
                rounded-2xl
                border border-white/10
                bg-white/70 dark:bg-black/40
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(0,0,0,0.2)]
                p-2
                flex flex-col
                origin-top
                transition-all duration-200
                ${open
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}
                `}
            >
                {children}
            </div>
        </div>
    );
};

export const DropdownItem = ({children, onClick}: DropdownItemProps): ReactNode => {
    return (
        <button
            onClick={onClick}
            className="
              w-full
              rounded-xl
              px-3 py-2
              text-left
              text-sm
              text-foreground/80
              transition-all duration-300
              hover:bg-primary
              hover:text-primary-foreground
              "
        >
            {children}
        </button>
    );
};
