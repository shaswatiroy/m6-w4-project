import React, { useContext, useEffect, useState } from 'react'
import Tile from './Tile'
import Header from './Header'
import userContext from '../Contexts/user/userContext'
import Loading from './Loading'

const Home = () => {
  const context = useContext(userContext);
  const [data, setData] = useState([])
  const { url, showAlert, fetchName, name, showLoading, loading } = context;
  const fetchdata = async () => {
    try {
      showLoading(true);
      const response = await fetch(`${url}/blog/fetchblogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const out = await response.json();
      if (response.status === 200) {
        setData(out);
      }
      else {
        showAlert('fail', '❌ Unable to load blogs. Please check your internet connection and try again.');
      }
    }
    catch (error) {
      console.log(error);
      showAlert("fail", "🌐 Network error. Unable to fetch blogs. Please check your connection.");
    }
    showLoading(false);
  }

  useEffect(() => {
    try {
      fetchdata();

      if (localStorage.getItem('blog-token')) {
        if (name === '') {
          fetchName();
        }
      }
    } catch (error) {
      showAlert('fail', '⚠️ Something went wrong. Please refresh the page and try again.');
    }
  }, [name])

  return (
    <>
      <Header />
      <div className='container py-4'>
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Latest Blogs</h2>
          </div>
        </div>
        <Loading />
        <div className="row">
          {data.map((val) => {
            return (
              <div key={val._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <Tile data={val} />
              </div>
            )
          })}
        </div>
        {!loading && data.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">No blogs available</h4>
            <p className="text-muted">Be the first to create a blog!</p>
          </div>
        ) : null}
        {!loading && data.length > 0 ? (
          <div className="text-center mt-4">
            <span className="text-muted">End of page</span>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Home
