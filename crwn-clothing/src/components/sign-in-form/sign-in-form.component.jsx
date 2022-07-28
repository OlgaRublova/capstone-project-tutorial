import React, {useContext, useState} from 'react';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';


import FormInputComponent from "../form-input/form-input.component";
import ButtonComponent from "../button/button.component";

import "./sign-in-form.styles.scss"
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInFormComponent = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const { setCurrentUser } = useContext(UserContext);


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const { user } =  await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user)
            resetFormFields();
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                    console.log("Incorrect password   for email");
                    break;
                case "auth/user-not-found":
                    console.log("No user found");
                    break;
                default:
                    console.log(err)
            }
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }




    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email & password</span>
            <form onSubmit={handleSubmit}>

                <FormInputComponent
                    label="Email"
                    type="email" name="email" value={email} required onChange={handleChange}/>

                <FormInputComponent
                    label="Password"
                    type="password" name="password" value={password} required onChange={handleChange}/>

                <div className="buttons-container">
                    <ButtonComponent type="submit">Sign In</ButtonComponent>
                    <ButtonComponent
                        type="button"
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >Sign In With Google</ButtonComponent>
                </div>

            </form>
        </div>
    );
};


export default SignInFormComponent;