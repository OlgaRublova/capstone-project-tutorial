import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";

import { UserContext } from "./contexts/user.context";

import HomeComponent from "./routes/home/home.component"; /*rsc*/
import NavigationComponent from "./routes/navigation/navigation.component";
import AuthenticationComponent from "./routes/authentication/authentication.component";
import ShopComponent from "./routes/shop/shop.component";

const App = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/" element={<NavigationComponent/>}>
                <Route index element={<HomeComponent/>}></Route>
                <Route path="shop" element={<ShopComponent/>}/>
                <Route
                    path="auth"
                    element={
                        currentUser ? <Navigate to="/" replace /> : <AuthenticationComponent />
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;