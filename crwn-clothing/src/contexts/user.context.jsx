import { createContext, useState } from "react";


// what we want to access from the state
export const UserContext = createContext({
    setCurrentUser: () => null, // empty function that returns null
    currentUser: null,
});


//COMPONENT
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};