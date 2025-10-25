import React, { useContext, useState } from 'react'
import DateObject from "react-date-object";
import userContext from '../Contexts/user/userContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
// import EditBlog from './EditBlog';

const TilePersonal = (props) => {
    const navigate = useNavigate();
    const context = useContext(userContext);
    const { newBlog, showAlert, url, newEdit } = context;
    const { data, fetchdata } = props;
    const date = new DateObject(data.date);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClick = (val) => {
        console.log(val);
        newBlog(val, false);
        navigate(`/page/${data._id}`);
    }

    const handleDelete = async () => {
        console.log("delete: data");
        const response = await fetch(`${url}/blog/deleteblog/${data._id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('blog-token')
            }
        });
        const out = await response.json();
        if (response.status !== 200) {
            showAlert('fail', out.errors.msg);
        }
        else {
            showAlert('success', '🗑️ Blog deleted successfully. It has been removed from your collection.');
            fetchdata();
        }
        setShowDeleteModal(false);
    }

    const confirmDelete = () => {
        setShowDeleteModal(true);
    }
    const handleChange = () => {
        console.log("Change working");
        newEdit(data);
        navigate('/editblog');
    }

    return (
        <div className="card h-100 shadow-sm">
            <img src={data.mainImg} alt='img' className="card-img-top" style={{ height: '200px', objectFit: 'cover' }}></img>
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">{data.tag}</span>
                    <small className="text-muted">{date.format("MMMM DD, YYYY")}</small>
                </div>
                <h5 className="card-title">{data.head}</h5>
                <p className="card-text flex-grow-1">{(data.title.length > 130) ? data.title.substring(0, 129) + "..." : data.title}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button onClick={() => { handleClick(data) }} className="btn btn-link text-decoration-none p-0 fw-bold text-primary">
                        Read More <i className="fa-solid fa-square-up-right ms-1"></i>
                    </button>
                    <small className="text-muted">&#8213; {data.author}</small>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button onClick={handleChange} className="btn btn-sm btn-outline-primary" title="Edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onClick={confirmDelete} className="btn btn-sm btn-outline-danger" title="Delete">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <ConfirmationModal
                show={showDeleteModal}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                title="Delete Blog"
                message={`Are you sure you want to delete "${data.head}"? This action cannot be undone.`}
                confirmText="Yes, Delete"
                cancelText="Cancel"
                type="danger"
            />
        </div>
    )
}

export default TilePersonal
