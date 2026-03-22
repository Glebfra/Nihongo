import { type ReactNode } from "react";
import { Link } from "react-router-dom";

export interface NavbarProps {
    children: ReactNode;
}

export interface NavbarLinkProps {
    href: string;
    children: ReactNode;
}

export const Navbar = ({children}: NavbarProps): ReactNode => {
    return (
        <header className="fixed top-10 left-1/2 z-50 -translate-x-1/2">
            <nav
                className="flex items-center gap-6 rounded-full border border-border bg-background-secondary backdrop-blur-xl px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all">
                {children}
            </nav>
        </header>
    );
};

export const NavbarLink = ({href, children}: NavbarLinkProps): ReactNode => {
    return (
        <Link
            to={href}
            className="
          relative px-4 py-1.5 text-sm font-medium text-foreground/70
          transition
          hover:text-foreground
          before:absolute before:bottom-0 before:left-1/2
          before:h-0.5 before:w-0 before:bg-primary
          before:transition-all before:duration-300
          hover:before:left-0 hover:before:w-full
          "
        >
            {children}
        </Link>
    );
};
