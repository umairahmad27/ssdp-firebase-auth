import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { auth, firestore } from "../config/firebase"

const initialState = { email: "", password: "" }

function Register() {

    const [state, setState] = useState(initialState)

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(state)

        const { email, password } = state

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                console.log("User Registered")
                console.log(userCredential)
                console.log(user)

                try {
                    setDoc(doc(firestore, "users", user.uid), { fullName: "", uid: user.uid })
                }
                catch (e) {
                    console.error(e)
                }
                // ...
            })
            .catch((error) => {
                console.error(error)
                // ..
            });
    }

    return (
        <main>
            <div className='py-5 w-100'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="card p-2 p-md-4 p-lg-5">
                                <h2 className="text-center mb-4">Register Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="email" className="form-control" placeholder="Email" name='email' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="password" className="form-control" placeholder="Password" name='password' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center">
                                            <button className='btn btn-outline-success w-50'>Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
