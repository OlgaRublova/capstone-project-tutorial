import React, {useContext, useState} from 'react';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';


import FormInputComponent from "../form-input/form-input.component";
import ButtonComponent from "../button/button.component";

import "./sign-in-form.styles.scss"

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInFormComponent = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;



    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            console.log('user sign in failed', error);
        }
    };

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