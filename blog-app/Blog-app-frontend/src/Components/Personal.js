import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext'
import TilePersonal from './TilePersonal'
import Loading from './Loading'


const YourBlogs = () => {
    const context = useContext(userContext);
    const { showAlert, url } = context;
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);

    const fetchdata = async () => {
        const response = await fetch(`${url}/blog/fetchpersonal`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('blog-token')
            }

        })
        if (response.status !== 200) {
            var msg = response.errors.msg;
            showAlert('fail', msg);
            navigate(-1);
        }
        else {
            const data = await response.json();
            console.log(data);
            setBlogs(data);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('blog-token')) {
            showAlert("warning", "🔒 Please login to view your personal blogs.");
            navigate('/login');
        }
        else {
            fetchdata();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-4">Your Blogs</h2>
                    </div>
                </div>
                <Loading />
                <div className="row">
                    {blogs.length !== 0 && blogs.map((data) => {
                        return (
                            <div key={data._id} className="col-12 col-md-6 col-lg-4 mb-4">
                                <TilePersonal data={data} fetchdata={fetchdata} />
                            </div>
                        )
                    })}
                </div>
                {blogs.length === 0 && (
                    <div className="text-center py-5">
                        <h4 className="text-muted">No blogs yet</h4>
                        <p className="text-muted">Create your first blog to get started!</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default YourBlogs
