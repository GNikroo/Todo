import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
 
const Todo = () => {
    const [showForm, setShowForm] = useState(false);
    const [showNew, setShowNew] = useState(true);
    const [showDelete, setShowDelete] = useState(true);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    const [showList, setShowList] = useState(true);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [failMessage, setFailMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [inputTitle, setInputTitle] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [items, setItems] = useState([
        {
            id: "001",
            name: "Write a short title for your task",
            desc: "Put the details here! Provide a description, url, another list... you name it!",
            status: false,
        },
    ]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
         setItems(items);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);    
    
    const handleInput = (e) => {
        setInputTitle(e.target.value);
    };
    const handleInputdesc = (e) => {
        setInputDesc(e.target.value);
    };

    const handleSubmit = (e) => {
        setShowList(true);
        setShowNew(true);
        e.preventDefault();
        if (!inputTitle || !inputDesc) {
            setFailMessage(true);
            showList(false);
        } else if (inputTitle && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputTitle, desc: inputDesc };
                    }
                    return elem;
                })
            );
            setInputTitle("");
            setInputDesc("");
            setToggleSubmit(true);
            setShowForm(false);
            setShowDelete(true);
            return (
                <div className="alert alert-success" role="alert">Updated</div>
            )
        } else {
            const allInputTitle = {
                id: new Date().getTime().toString(),
                name: inputTitle,
                desc: inputDesc,
            };
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
            }, 2000);
            setItems([allInputTitle, ...items]);
            setInputTitle("");
            setInputDesc("");
            setShowForm(false);
        }
    };

    const handleDelete = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });
        setDeleteMessage(true);
        setTimeout(() => {
            setDeleteMessage(false);
        }, 2000);
 
        setTimeout(() => {
            setItems(updatedItems);
        }, 1000);
    };

    const handleEdit = (id) => {
        setShowList(false);
        setShowDelete(false);
        setShowNew(false);
        setShowForm(true); 
        setToggleSubmit(false);
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        setInputTitle(newEditItem.name);
        setInputDesc(newEditItem.desc);
 
        setIsEditItem(id);
    };

    const handleAdd = () => {
        setShowForm(true);
        setShowList(true);
        setShowNew(false);
    };

    return (
        <div>
            {showNew ? (
                <div className="container">
                    <div className="col-12 text-end pb-2">
                        <button className="btn btn-light btn-outline-dark btn-sm btn-primary" onClick={handleAdd}>
                            New
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}        
            {showForm ? (
                <div>
                    <div className="container border rounded d-flex justify-content-center shadow p-3 mb-2 bg-white rounded">
                        <div className="row">
                            <div className="text-center">
                                <h2 className="fs-4">{toggleSubmit ? "Add Task" : " Edit Task"}</h2>
                            </div>
                            <form className="col-12 p-2" onSubmit={handleSubmit}>
                                <label htmlFor="title" className="my-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    className="w-100 my-1 p-2"
                                    onChange={handleInput}
                                    value={inputTitle}
                                />
                                <label className="my-2" htmlFor="description">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    className="w-100 my-1 p-2"
                                    onChange={handleInputdesc}
                                    value={inputDesc}
                                />
                                {toggleSubmit ? (
                                    <button className="btn btn-sm btn-dark btn-outline-light my-2">Save</button>
                                ) : (
                                    <button className="btn btn-sm btn-dark btn-outline-light my-2">Update</button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}        
            {showList ? (
                <div className="container py-2">
                    {failMessage ? (
                        <div className="alert alert-warning" role="alert">Please complete the form to save your task</div>
                    ) : (
                        ""
                    )}
                    {successMessage ? (
                        <div className="alert alert-success" role="alert">Task added</div>
                    ) : (
                        ""
                    )}
                    {deleteMessage ? (
                        <p className="alert alert-danger" role="alert">Task deleted</p>
                    ) : (
                        ""
                    )}
                    {items.map((elem, index) => {
                        return (
                            <div className="row align-items-center border rounded shadow bg-dark text-light text-start mb-2" key={elem.id}>
                                <div className="col-auto">
                                    <Checkbox />
                                </div>
                                <div className="col-7">
                                    <h4 className="fs-4 mt-1">{elem.name}</h4>
                                    <p className="fs-6 mb-1 fw-light">{elem.desc}</p>
                                </div>
                                <div className="col-2 col-lg-2 col-sm-3 ms-auto">
                                    <button className="btn btn-sm btn-outline-light mx-2" onClick={() => handleEdit(elem.id)}>
                                        Edit
                                    </button>
                                    {showDelete ? (
                                        <button className="btn btn-sm btn-light mx-2" onClick={() => handleDelete(elem.id)}>
                                            Delete
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>                            
                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
 
export default Todo;