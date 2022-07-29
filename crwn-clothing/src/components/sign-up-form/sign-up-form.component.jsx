import React, { useState} from 'react';
import "./sign-up-form.styles.scss"
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';


import FormInputComponent from "../form-input/form-input.component";
import ButtonComponent from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpFormComponent = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log("Passwords don't match")
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);


            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                console.log("Email is already in use.")
            }
            console.log(err.message)
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign Up with your email & password</span>
            <form onSubmit={handleSubmit}>
                <FormInputComponent
                    label="Display Name"
                    type="text" name="displayName" value={displayName} required onChange={handleChange}/>
                <FormInputComponent
                    label="Email"
                    type="email" name="email" value={email} required onChange={handleChange}/>

                <FormInputComponent
                    label="Password"
                    type="password" name="password" value={password} required onChange={handleChange}/>

                <FormInputComponent
                    label="Confirm Password"
                    type="password" name="confirmPassword" value={confirmPassword} required onChange={handleChange}/>
                <ButtonComponent type="submit">Sign Up</ButtonComponent>
            </form>
        </div>
    );
};


export default SignUpFormComponent;