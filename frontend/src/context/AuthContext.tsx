import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';

interface AuthContextProps {
    authUser: any;
    setAuthUser: Dispatch<SetStateAction<any>>;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children } : AuthContextProviderProps) => {
    const [authUser, setAuthUser] = useState<any>(JSON.parse(localStorage.getItem('auramic-logged-user') || 'null'));

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
