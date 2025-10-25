import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import userContext from '../../Contexts/user/userContext';
import DateObject from "react-date-object";
import InputArea from '../InputArea/InputArea';

// import StringParser from '../Modules/StringParser'

const Addblog = () => {
    const context = useContext(userContext);
    var date = new DateObject();
    const { name, showAlert, url } = context;
    // const isnew = edit.isnew;  -- not needed as editBlog handles edit
    const navigate = useNavigate();
    let [value, setValue] = useState([]);
    let [imp, setImp] = useState({ head: "", title: "", mainImg: "", tag: "" });
    // to activate loader in submit btn
    const [loading, setLoading] = useState(false);

    let data = {};

    const addElement = (what) => {
        if (what === 'p') {
            setValue(value.concat([['p', '', value.length]]));
            // console.log(value)

        }
        else if (what === 'h2') {
            setValue(value.concat([['h2', '', value.length]]))
            // console.log("heading", value)
        }
        else if (what === 'Code') {
            setValue(value.concat([['Code', '', value.length]]))
            // console.log(value)

        }

        else {
            setValue(value.concat([['img', '', value.length]]))
            // console.log(value)
        }
        // Bootstrap dropdown handles showing; no manual toggle
    }

    const delete_element = (val) => {
        setValue(value.filter((v) => {
            return v !== val;
        }));
    }


    const onchange = (e) => {
        let temp = value.map((val) => {
            if (val[2] === parseInt(e.target.name)) {
                return [val[0], e.target.value, val[2]];
            }
            else {
                return val;
            }
        });
        // console.log(temp, e.target.value);
        setValue(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submit action");
        let response;
        data = {
            author: name,
            date: date,
            head: imp.head,
            title: imp.title,
            mainImg: imp.mainImg,
            tag: imp.tag.toUpperCase().trim(),
            elements: value
        }
        // console.log(data);

        response = await fetch(`${url}/blog/addblog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('blog-token')
            },
            body: JSON.stringify(data)
        })

        const json = await response.json();
        console.log("Data: ", json);
        setLoading(false);
        if (response.status !== 200) {
            showAlert('fail', json.errors.msg);
        }
        else {
            showAlert('success', '✨ Blog created successfully! Your new blog is now live.');
            navigate('/personal');
        }
    }

    const impChange = (e) => {
        setImp({ ...imp, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (!localStorage.getItem('blog-token')) {
            showAlert("warning", "🔒 Please login to create a new blog.")
            navigate('/');
        }
    })


    const reset_val = () => {
        setValue([]);
        setImp({ head: "", title: "", mainImg: "", tag: "" });
    }

    const go_back = () => {
        console.log("Go back");
        navigate(-1);
    }

    const check_toggle = () => {
        const default_img = "https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg";
        if (imp.mainImg !== default_img) {
            setImp({ ...imp, mainImg: default_img });
        }
        else {
            setImp({ ...imp, mainImg: "" });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <h1 className="mb-3">New Blog</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 text-muted small">{date.format("MMMM DD, YYYY")}</div>
                    <div className="mb-3">
                        <label htmlFor="head" className="form-label">Enter the heading of blog</label>
                        <textarea className="form-control" name="head" id="head" rows="1" required value={imp.head} onChange={impChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Enter the title of blog</label>
                        <textarea className="form-control" name="title" id="title" rows="5" required value={imp.title} onChange={impChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <label htmlFor="mainImg" className="form-label mb-0">Main image URL</label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="defaultImageSwitch" onChange={check_toggle} checked={imp.mainImg === "https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg"} />
                                <label className="form-check-label" htmlFor="defaultImageSwitch">Use default</label>
                            </div>
                        </div>
                        <textarea className="form-control" name="mainImg" id="mainImg" rows="2" required value={imp.mainImg} onChange={impChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag (blogs with <em>private</em> are visible only to you)</label>
                        <textarea className="form-control" name="tag" id="tag" rows="1" style={{ textTransform: 'uppercase' }} required value={imp.tag} onChange={impChange}></textarea>
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h2 className="h5 mb-0">Elements</h2>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add element
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><button className="dropdown-item" type="button" onClick={() => addElement('h2')}><i className="fa-solid fa-plus me-2"></i>Sub-heading</button></li>
                                    <li><button className="dropdown-item" type="button" onClick={() => addElement('p')}><i className="fa-solid fa-plus me-2"></i>Paragraph</button></li>
                                    <li><button className="dropdown-item" type="button" onClick={() => addElement('img')}><i className="fa-solid fa-plus me-2"></i>Image</button></li>
                                    <li><button className="dropdown-item" type="button" onClick={() => addElement('Code')}><i className="fa-solid fa-plus me-2"></i>Code</button></li>
                                </ul>
                            </div>
                        </div>
                        {value.map((val) => {
                            return (
                                <InputArea key={val[2]} val={val} onchange={onchange} delete_element={delete_element} />
                            )
                        })}
                    </div>
                    <div className='d-flex gap-2'>
                        <button type="submit" className="btn btn-primary">Add blog{loading && <span className="ms-2 spinner-border spinner-border-sm"></span>}</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={reset_val}>Reset</button>
                        <button type="button" className="btn btn-outline-danger" onClick={go_back}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Addblog

