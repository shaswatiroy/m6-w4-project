import React, { createElement, useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import DateObject from "react-date-object";
import { useNavigate, useParams } from 'react-router'
import userContext from '../Contexts/user/userContext'
import Code from './Code';
import Loading from './Loading';

const Page = () => {
    const context = useContext(userContext);
    const navigate = useNavigate();
    const { url, showAlert, showLoading } = context;
    const params = useParams();
    const { id } = params;
    const [blog, setBlog] = useState({ elements: [] });
    let date = null;
    const [loading, setLoading] = useState(false);

    const fetchdata = async () => {
        try {
            showLoading(true);
            setLoading(true);
            const response = await fetch(`${url}/blog/fetchblog?id=${id}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('blog-token')
                }
            });
            if (response.status === 200) {
                showLoading(false);
                setLoading(false);
                let data = await response.json();
                setBlog(data);
                date = new DateObject(blog.date);
                console.log(data);
            }
            else {
                let msg = await response.json();
                showLoading(false);
                setLoading(false);
                showAlert('fail', msg.errors.msg);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            showAlert('fail', 'The blog you are looking is unavailable.');
            navigate('/');
        }
    }

    useEffect(() => {
        fetchdata();
        // eslint-disable-next-line
    }, [])

    let key = 0;


    // const data = blog.data;
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <div>
            <Navbar />
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button onClick={handleBack} className="btn btn-outline-secondary">
                                <i className="fa-solid fa-arrow-left me-2"></i>Back
                            </button>
                        </div>
                        {!loading && (
                            <article className="card shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="badge bg-primary">{blog && blog.tag}</span>
                                        <small className="text-muted">{date && date.format("MMMM DD, YYYY")}</small>
                                    </div>
                                    <h1 className="card-title mb-3">{blog && blog.head}</h1>
                                    <div className="text-muted mb-4">&#8213; {blog && blog.author}</div>
                                    <img src={blog && blog.mainImg} alt="error" className="img-fluid rounded mb-4" style={{ maxHeight: '420px', objectFit: 'cover', width: '100%' }} />
                                    <div className="lead mb-4">{blog && blog.title}</div>
                                    <div className="blog-content">
                                        {blog && blog.elements.map((element) => {
                                            if (element[0] === 'p') {
                                                key++;
                                                return createElement(element[0], { className: "mb-3", key: key }, element[1])
                                            }
                                            if (element[0] === 'h2') {
                                                key++;
                                                return createElement(element[0], { className: "h4 mb-3 mt-4", key: key }, element[1])
                                            }
                                            if (element[0] === 'img') {
                                                key++;
                                                return createElement(element[0], { className: "img-fluid rounded my-4", src: element[1], key: key, style: { maxHeight: '420px', objectFit: 'cover', width: '100%' } })
                                            }
                                            if (element[0] === 'Code') {
                                                key++;
                                                return <Code key={key} codeString={element[1]} />
                                            }
                                        })}
                                    </div>
                                </div>
                            </article>
                        )}
                    </div>
                </div>
            </div>
            <Loading />
        </div>
    )
}

export default Page
