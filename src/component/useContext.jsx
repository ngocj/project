import { createContext, useState } from "react";


export const UseContext = createContext(null);
export const ContextProvider = ({ children }) => {

    const [theme, setTheme] = useState(true);
    return (
        <UseContext.Provider value={{theme, setTheme}}>
            {children}
        </UseContext.Provider>
    )
}