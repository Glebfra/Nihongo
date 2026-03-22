import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout.tsx";
import Loading from "./components/ui/Loading.tsx";

const Main = lazy(() => import("./pages/Main"));
const Dictionary = lazy(() => import("./pages/Dictionary"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <MainLayout>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/dictionary" element={<Dictionary/>}/>
                    </Routes>
                </Suspense>
            </MainLayout>
        </BrowserRouter>
    </StrictMode>,
);
