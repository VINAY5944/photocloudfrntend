import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../Reduxcomponnts/Slice';
import axios from 'axios';
import rooturl from '../url';


const Singleimages = () => {

  const nav=useNavigate()
  const [del,setDel]=useState([])
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.yourData);
  const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const singleData = data.find((item) => item.id === id);

  if (!singleData) {
    return <div>Image not found</div>;
  }


  
const todelete=async(e)=>{


  try {
    console.log('Deleting:', singleData);

    // Update the API endpoint to include the specific identifier (e.g., id)
    const response = await axios.delete(`${rooturl}/delete`, {
      data: { id: singleData.id, file: singleData.file },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`,
      },
    });

    console.log('Delete Response:', response.data);
    nav('/home')
    // Optionally, you can redirect or update your state after successful deletion
  } catch (error) {
    console.error('Error deleting image:', error);
    // Handle errors or display a message to the user
  }
}


console.log(del);

  return (
    <div>
      <h2>{singleData.title}</h2>
      <img   style={{height:'500px',width:"500px"}} src={singleData.url} alt={singleData.id} />
      <button    onClick={()=>todelete(singleData)} >delete</button>
     <a    href={singleData.url}  ><button>download</button></a>
    </div>
  );
};

export default Singleimages;
