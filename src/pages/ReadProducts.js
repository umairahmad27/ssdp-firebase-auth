import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { firestore } from '../config/firebase';

export default function ReadProducts() {

    const [products, setProducts] = useState([])
    const [productForEdit, setProductForEdit] = useState({})

    const handleChange = e => {
        setProductForEdit({ ...productForEdit, [e.target.name]: e.target.value })
    }

    const fetchDocuments = async () => {

        let array = []

        const querySnapshot = await getDocs(collection(firestore, "products"));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            data.id = doc.id
            // console.log(data)
            array.push(data)

            // console.log(`${doc.id} => ${doc.data()}`);
        });

        setProducts(array)
    }

    useEffect(() => {
        fetchDocuments()
    }, [])

    const handleEdit = (product) => {
        setProductForEdit(product)
        console.log(product)
    }

    const handleUpdate = async (product) => {

        await setDoc(doc(firestore, "products", product.id), product, { merge: true });

        console.log("document updated")

        let newProducts = products.map((oldProduct) => {
            if (oldProduct.id === product.id) {
                return product
            } else {
                return oldProduct
            }
        })

        setProducts(newProducts)

        setProductForEdit({})

    }
    const handleDelete = async (product) => {
        // console.log(product)

        await deleteDoc(doc(firestore, "products", product.id));
        console.log("document deleted")

        let newProducts = products.filter((newProduct) => {
            return product.id !== newProduct.id
        })

        setProducts(newProducts)
    }

    return (
        <>
            <main>
                <div className='py-5 w-100'>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className="text-white text-center">Products</h1>
                                <hr />
                                {products.length > 0
                                    ? <div className="table-responsive">
                                        <table className="table table-light table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {products.map((product, i) => {
                                                    return <tr key={i}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{product.title}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.description}</td>
                                                        <td>
                                                            <button className='btn btn-sm btn-info me-2' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { handleEdit(product) }}>Update</button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => { handleDelete(product) }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    : <div className='text-center'><div className="spinner-border text-white"></div></div>
                                }




                            </div>
                        </div>
                    </div>
                </div>
            </main >

            {/* <!-- Modal --> */}
            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit {productForEdit.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Title" name='title' value={productForEdit.title} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Description" name='description' value={productForEdit.description} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="Price" name='price' value={productForEdit.price} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleUpdate(productForEdit) }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
