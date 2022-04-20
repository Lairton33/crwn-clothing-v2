import { useState, useContext } from "react";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils" ;

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../contexts/user.context";
import "./sign-in-form.styles.scss"


const defaultFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { setCurrentUser } = useContext(UserContext);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
      } 

    const changeHandler = (event) => {
        const { name, value } = event.target;
        // similar to:
        //      const obj = formFields;
        //      obj[name] = value;
        setFormFields({...formFields, [name]: value});
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields(); 
                   
        } catch (error) {
            switch(error.code) {
            case "auth/wrong-password":
                alert("Wrong password, Try again!");
                break;
            case "auth/user-not-found":
                alert("No user associated with this email!");
                break;
            default:
              console.error(error.message)
            }
        } 
    }
    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form method="POST" onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>

            </form>
        </div>
    );
}
export default SignInForm;