import { render, screen } from '@testing-library/react';
import Login from "../components/auth/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";

describe('Login form', () => {
    it('<Login />', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        );

        expect(screen.getByText((content, element) => {
            return content.includes('Login') && element?.tagName.toLowerCase() === 'h6';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Hasło') && element?.tagName.toLowerCase() === 'h6';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Zaloguj') && element?.tagName.toLowerCase() === 'button';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return content.includes('Nie posiadasz jeszcze konta? Zarejestruj się!') && element?.tagName.toLowerCase() === 'button';
        })).toBeInTheDocument();
    });

});