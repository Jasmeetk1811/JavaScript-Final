import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NotificationContext } from '../../shared/Notifications';
import { UserContext } from '../../Authentication/UserProvider';
import { GlobalStoreContext } from '../../shared/Globals';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const ImageForm = ({ endpoint, preload }) => {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { globalStore } = useContext(GlobalStoreContext);

  useEffect(() => {
    setInputs({...preload});
  }, [preload])

  const handleChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  const handleFileInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.files[0]
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(inputs);

    const fd = new FormData();
    
    fd.append('caption', inputs["caption"]);
    fd.append('image', inputs["image"]);
    fd.append('secret_token', user && user.token)

    Axios({
      method: 'post',
      url: `${globalStore.REACT_APP_ENDPOINT}/${endpoint}`,
      data: fd,
      headers: {'Content-Type': 'multipart/form-data' },
    })
    .then(({ data }) => {
      if (data) {
        setNotification({
          type: "success",
          message: "Image was added successfully"
        });
      }

      setRedirect(true);
    })
    .catch((error) => {
      setNotification({
        type: "danger",
        message: `There was an error adding the image: ${error.message}`
      });
    });
  };

  if (redirect) return <Redirect to="/images" />;
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Image caption</Form.Label>
        <Form.Control
          type="input"
          onChange={handleChange} 
          name="caption" 
          placeholder="caption"
          defaultValue={inputs.caption}
        />
      </Form.Group>
      <Form.Group>
        <Form.File 
          custom
          id="custom-file"
          label={(inputs.image && inputs.image.name) || "Image here."}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileInputChange}
          defaultValue={inputs.image}
        />
      </Form.Group>
      <Button type="submit" variant="dark">Submit</Button>
      {/* <button type="submit">Submit</button> */}
    </Form>
  );
}
 
export default ImageForm;