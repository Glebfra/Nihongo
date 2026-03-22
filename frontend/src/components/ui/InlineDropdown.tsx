import { type ReactNode, useState } from "react";
import { cn } from "../../scripts/cn.ts";
import { ChevronDown } from "lucide-react";

export interface InlineDropdownProps {
    label: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
}

export interface InlineDropdownItemProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
}

export const InlineDropdown = ({label, children, className, icon}: InlineDropdownProps): ReactNode => {
    const [ open, setOpen ] = useState(false);

    return (
        <div className="max-w-md">
            <div
                className={cn("rounded-4xl backdrop-blur-xl", className)}>
                <button onClick={() => setOpen(!open)}>
                    <div className="inline-flex items-center justify-between gap-2">
                        <span className='p-1 m-1'>{icon}</span>
                        <h2 className="py-1 my-1">{label}</h2>
                        <span className='py-1 m-1'>
                            <ChevronDown
                                className={`transition-all duration-500 ${open ? "rotate-180" : ""}`}/>
                        </span>
                    </div>
                </button>

                <div
                    className={`
                    overflow-hidden
                    transition-all duration-500
                    ${open ? "max-h-96 mt-3" : "max-h-0"}
                `}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export const InlineDropdownItem = ({children, onClick, className}: InlineDropdownItemProps): ReactNode => {
    return (
        <button
            onClick={onClick}
            className={cn("ml-5 flex rounded-xl px-4 py-2 text-left text-foreground", className)}
        >
            {children}
        </button>
    );
};
