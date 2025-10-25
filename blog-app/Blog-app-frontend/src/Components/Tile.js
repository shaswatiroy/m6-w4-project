import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DateObject from "react-date-object";
import userContext from '../Contexts/user/userContext';



const Tile = (props) => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { newBlog } = context;
  const { data } = props;
  const date = new DateObject(data.date);

  const handleClick = () => {
    console.log(data);
    newBlog(data, false);
    navigate(`/page/${data._id}`);
  }


  return (
    <div className="card mb-4 shadow-sm">
      <img src={data.mainImg} alt='img' className="card-img-top" style={{ height: '200px', objectFit: 'cover' }}></img>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary">{data.tag}</span>
          <small className="text-muted">{date.format("MMMM DD, YYYY")}</small>
        </div>
        <h5 className="card-title">{data.head}</h5>
        <p className="card-text">{(data.title.length > 130) ? data.title.substring(0, 129) + "..." : data.title}</p>
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={handleClick} className="btn btn-link text-decoration-none p-0 fw-bold text-primary">
            Read More <i className="fa-solid fa-square-up-right ms-1"></i>
          </button>
          <small className="text-muted">&#8213; {data.author}</small>
        </div>
      </div>
    </div>
  )
}

export default Tile
