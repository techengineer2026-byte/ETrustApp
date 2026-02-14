// src/context/EmployerAuthContext.tsx

import React, { createContext, useState, ReactNode } from "react";

// Define the structure of your registration data
interface EmployerAuthData {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    emailStatus?: boolean;
    phone?: string;
    phoneStatus?: boolean;
    password?: string;
    confirmPassword?: string;
    logo?: string; // URI of uploaded logo
    avatarLetter?: string;
    fullAddress?: string;
    city?: string;
    district?: string;
    pincode?: string;
}

interface EmployerAuthContextProps {
    data: EmployerAuthData;
    setData: (newData: Partial<EmployerAuthData>) => void;
    resetData: () => void;
}

export const EmployerAuthContext = createContext<EmployerAuthContextProps>({
    data: {},
    setData: () => { },
    resetData: () => { },
});

export const EmployerAuthProvider = ({ children }: { children: ReactNode }) => {
    const [data, setDataState] = useState<EmployerAuthData>({});

    const setData = (newData: Partial<EmployerAuthData>) => {
        setDataState((prev) => ({ ...prev, ...newData }));
    };

    const resetData = () => setDataState({});

    return (
        <EmployerAuthContext.Provider value={{ data, setData, resetData }}>
            {children}
        </EmployerAuthContext.Provider>
    );
};
