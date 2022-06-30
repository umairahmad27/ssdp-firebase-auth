import React, { useState } from "react"
import { collection, addDoc, doc, setDoc } from "firebase/firestore/lite";
import { firestore } from "../config/firebase";

const initialState = { title: "", description: "", price: "" }

export default function AddProduct() {

    const [state, setState] = useState(initialState)

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(state)

        let { title, description, price } = state

        title = title.trim()
        description = description.trim()
        price = Number(price)

        if (title.length < 3) {
            alert("title ki length km hai")
            return;
        }
        if (description.length < 10) {
            alert("description ki length km hai")
            return;
        }
        if (!price || price < 0) {
            alert("price km hai")
            return;
        }

        let formData = { title, description, price }

        try {
            const docRef = await addDoc(collection(firestore, "products"), formData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     console.log(state)

    //     const { fullName, age, country } = state

    //     let randomId = Math.random().toString(36).slice(2)
    //     console.log(randomId)

    //     try {
    //         await setDoc(doc(firestore, "users", randomId), { fullName, age, country, id: randomId });
    //         console.log("Document written with ID: ", docRef);
    //         console.log("Document written with ID: ", randomId);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    return (
        <main>
            <div className='py-5 w-100'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="card p-2 p-md-4 p-lg-5">
                                <h2 className="text-center mb-4">Add Product Form</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Title" name='title' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Description" name='description' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="Price" name='price' onChange={handleChange} />
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