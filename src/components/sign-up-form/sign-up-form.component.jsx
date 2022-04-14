import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils" 

const defaultFormFields = {
    email: "",
    password: "",
    displayName: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
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
            await createUserDocumentFromAuth(user,{displayName});
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
        // similar to Obj = formFields; Obj[name] = value;
        setFormFields({...formFields, [name]: value});
    }
    console.log(formFields)
    return (
        <div>
            <form method="POST" onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input
                    required
                    type="text"
                    name="displayName"
                    onChange={changeHandler}
                    value={displayName}
                />
                
                <label>Email</label>
                <input
                    required
                    type="email"
                    name="email"
                    onChange={changeHandler}
                    value={email}
                />

                <label>Password</label>
                <input 
                    required
                    type="password"
                    name="password"
                    onChange={changeHandler}
                    value={password}
                />

                <label>Confirm Password</label>
                <input 
                    required
                    type="password"
                    name="confirmPassword"
                    onChange={changeHandler}
                    value={confirmPassword}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default SignUpForm;