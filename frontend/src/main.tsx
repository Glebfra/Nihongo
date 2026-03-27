import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout.tsx";
import Loading from "./components/ui/Loading.tsx";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import axios from "axios";

const Main = lazy(() => import("./pages/Main"));
const Dictionary = lazy(() => import("./pages/Dictionary"));
const Auth = lazy(() => import("./pages/Auth"));
const Account = lazy(() => import("./pages/Account"));

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <MainLayout>
                    <Suspense fallback={<Loading/>}>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/dictionary" element={<Dictionary/>}/>
                            <Route path="/auth" element={<Auth/>}/>
                            <Route path="/account" element={<Account/>}/>
                        </Routes>
                    </Suspense>
                </MainLayout>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>,
);
