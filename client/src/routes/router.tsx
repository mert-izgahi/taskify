import { Routes, Route } from "react-router-dom";

import {
    AuthLayout,
    AuthSignInPage,
    AuthSignUpPage
} from "./auth"


import {RootLayout,RootHomePage} from "./root";

import { NotFoundPage } from "./not-found";


export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<RootHomePage />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="sign-in" element={<AuthSignInPage />} />
                <Route path="sign-up" element={<AuthSignUpPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}