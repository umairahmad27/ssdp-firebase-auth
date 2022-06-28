import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore/lite";
import { firestore } from "../config/firebase";

const initialState = { fullName: "", age: "", country: "" }

export default function AddUser() {

    const [state, setState] = useState(initialState)

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(state)

        const { fullName, age, country } = state

        try {
            const docRef = await addDoc(collection(firestore, "users"), { fullName, age, country });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <main>
            <div className='py-5 w-100'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="card p-2 p-md-4 p-lg-5">
                                <h2 className="text-center mb-4">Add User Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Full Name" name='fullName' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="Age" name='age' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Country" name='country' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-center">
                                            <button className='btn btn-outline-success w-50'>Add User</button>
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