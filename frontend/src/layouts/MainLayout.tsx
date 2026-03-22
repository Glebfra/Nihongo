import type { ReactNode } from "react";
import { Navbar, NavbarLink } from "../components/ui/Navigation.tsx";
import { BookA, CircleUser, GraduationCap, House } from "lucide-react";
import ContainerLayout from "./ContainerLayout.tsx";

export interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({children}: MainLayoutProps): ReactNode => {
    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Navbar>
                <div className="flex items-center gap-1">
                    <NavbarLink href="/"><House/></NavbarLink>
                    <NavbarLink href="/learn"><GraduationCap/></NavbarLink>
                    <NavbarLink href="/dictionary"><BookA/></NavbarLink>
                    <NavbarLink href="/account"><CircleUser/></NavbarLink>
                </div>
            </Navbar>
            <ContainerLayout>
                <main className="flex-1 mt-40">
                    {children}
                </main>
            </ContainerLayout>
            <footer className="mt-auto">
                Footer
            </footer>
        </div>
    );
};
