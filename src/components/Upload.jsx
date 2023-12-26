import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import rooturl from '../url';


const Upload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);



  const userInfo = JSON.parse(localStorage.getItem("currentUserInfo"));


  
  const submitted = async (e) => {


    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('userId',userInfo.Id)
    // Check if a file is selected before appending it to the form data
    if (file) {
     
       await axios.post(`${rooturl}/upload`,formData,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
         
        }})
    }

    console.log(title, file);

    // Now you can send formData to your server using an API request
  };




  return (
    <div>
      Upload file
      <Form  enctype="multipart/form-data"
        style={{ border: 'solid', width: '200px', alignItems: 'center', marginLeft: '40%' }}
        onSubmit={submitted}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Upload</Form.Label>
          <Form.Control type="file" required onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Upload;
