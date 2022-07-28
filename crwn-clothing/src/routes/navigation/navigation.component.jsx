import React, {useContext} from 'react';
import {Outlet, Link} from "react-router-dom";
import "./navigation.styles.scss"
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";

const NavigationComponent = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null)
    }


    return (
        <>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <CrownLogo className="logo"/>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    {
                        currentUser ?
                            (<span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>) :
                            (<Link className="nav-link" to="/auth">SIGN IN</Link>)
                    }

                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default NavigationComponent;