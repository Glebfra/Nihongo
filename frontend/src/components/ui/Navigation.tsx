import { type ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface NavbarProps {
    children: ReactNode;
}

export interface NavbarLinkProps {
    href: string;
    children: ReactNode;
}

export const Navbar = (props: NavbarProps): ReactNode => {
    const [ isHidden, setIsHidden ] = useState<boolean>(false);
    const [ lastScrollY, setLastScrollY ] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            setIsHidden((currentScrollY > lastScrollY) && (currentScrollY > 100));
            setLastScrollY(currentScrollY);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [lastScrollY]);

    return (
        <nav
            className={`
                flex items-center gap-6 rounded-full
                border border-border
                bg-background-secondary backdrop-blur-xl
                px-6 py-3
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                transition-all duration-300
                ${isHidden ? "opacity-0 -translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"}`}>
            {props.children}
        </nav>
    );
};

export const NavbarLink = (props: NavbarLinkProps): ReactNode => {
    return (
        <Link
            to={props.href}
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
            {props.children}
        </Link>
    );
};
