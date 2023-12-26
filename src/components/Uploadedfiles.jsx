import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../Reduxcomponnts/Slice'

const Uploadedfiles = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.yourData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <div>
{data.map((item) => (
<><h2>{item.title}</h2>
  <img
    key={item.file}
    style={{ height: "150px", width: "150px" }}
    src={item.url}
    alt={item.file}
    onError={(e) => console.error('Image loading error:', e)}
    
  />
  
  
 <Link  to={`/single/${item.id}`} ><button>view</button></Link> 
  
  </>


 
))}
    </div>
  )
}

export default Uploadedfiles