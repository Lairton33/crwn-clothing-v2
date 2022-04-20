import { useState, useContext } from "react";

import {
    createUserDocumentFromAuth,
    createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils" ;

import FormInput from "../../components/form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
import "./sign-up-form.styles.scss"

const defaultFormFields = {
    email: "",
    password: "",
    displayName: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { setCurrentUser } = useContext(UserContext);
    const {
        email,
        password,
        displayName,
        confirmPassword
    } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("your password does not match!")
            return;
        }
        try{
            
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            if (!user) return;

            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields(); 
                   
        } catch (error) {
            if (error.code === "auth/email-already-in-use"){
                alert("Cannot create user email already in use!")
            } else {
              console.error(error.message)
            }
        }
    }
    const changeHandler = (event) => {
        const { name, value } = event.target;
        // similar to:
        //      const obj = formFields;
        //      obj[name] = value;
        setFormFields({...formFields, [name]: value});
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form method="POST" onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    required
                    type="text"
                    name="displayName"
                    onChange={changeHandler}
                    value={displayName}
                />
                
                <FormInput
                    label="Email"
                    required
                    type="email"
                    name="email"
                    onChange={changeHandler}
                    value={email}
                />

                <FormInput
                    label="Password"
                    required
                    type="password"
                    name="password"
                    onChange={changeHandler}
                    value={password}
                />

                <FormInput
                    label="Confirm Password" 
                    required
                    type="password"
                    name="confirmPassword"
                    onChange={changeHandler}
                    value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}
export default SignUpForm;