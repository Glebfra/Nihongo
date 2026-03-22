import { type ReactNode, useState } from "react";
import { cn } from "../../scripts/cn.ts";
import { ChevronDown } from "lucide-react";

export interface InlineDropdownProps {
    label: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    "data-selected"?: boolean;
}

export interface InlineDropdownItemProps {
    children: ReactNode;
    className?: string;
    "data-selected"?: boolean;
}

export const InlineDropdown = (props: InlineDropdownProps): ReactNode => {
    const [ open, setOpen ] = useState(false);

    return (
        <div className="max-w-md">
            <div
                data-selected={props["data-selected"]}
                className={cn("rounded-4xl backdrop-blur-xl", props.className)}>
                <button onClick={() => setOpen(!open)}>
                    <div className="inline-flex items-center justify-between gap-2">
                        <span className="p-1 m-1">{props.icon}</span>
                        <h2 className="py-1 my-1">{props.label}</h2>
                        <span className="py-1 m-1">
                            <ChevronDown
                                className={`transition-all duration-500 ${open ? "rotate-180" : ""}`}/>
                        </span>
                    </div>
                </button>

                <ul
                    className={`
                    overflow-hidden
                    transition-all duration-500
                    ${open ? "max-h-96 mt-3" : "max-h-0"}
                `}
                >
                    {props.children}
                </ul>
            </div>
        </div>
    );
};

export const InlineDropdownItem = (props: InlineDropdownItemProps): ReactNode => {
    return (
        <li
            data-selected={props["data-selected"]}
            className={cn("ml-5 flex rounded-xl px-4 py-2 text-left text-foreground", props.className)}
        >
            {props.children}
        </li>
    );
};
