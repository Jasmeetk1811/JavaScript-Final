import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Image, Row, Col, Button, Spinner } from "react-bootstrap";
import Axios from "axios";

import { UserContext } from "../Authentication/UserProvider";
import { GlobalStoreContext } from "../shared/Globals/index";
import { NotificationContext } from "../shared/Notifications";

import ImageDetailModel from "./Show";

const Images = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModelShow] = useState(false);
  const [selectedImage, setSeletedImage] = useState({});
  const [modalLoading, setModalLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/images`)
      .then(({ data }) => {
        setImages(data.images);
        setLoading(false);
      })
      .catch((error) => {
        setNotification({
          type: "danger",
          message: `There was an error retrieving the images: ${error.message}`,
        });
        setLoading(false);
      });
  }, [globalStore, setNotification]);

  const handleAddImageLink = () => {
    if (user && user.token) {
      history.push("/images/new");
    } else {
      history.push("/login");
    }
  };

  const handleShowModal = async event => {
    setModalLoading(true);
    setModelShow(true);
    const imageData = await fetchImageDetail(event.target.dataset.imageId)
    setSeletedImage(imageData)
    setModalLoading(false);
  }
  
  const handleHideModel = () => {
    setModelShow(false)
    setSeletedImage({})
  }

  const fetchImageDetail = async (id) => {
    try {
      const response = await Axios.get(`${globalStore.REACT_APP_ENDPOINT}/images/${id}`)
      return response.data

    } catch (error) {
      console.error(error); 
      setNotification({
        type: "danger",
        message: `There was an error retrieving the image detail: ${error.message}`,
      });
    }
  
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          {loading ? (
            // Loading spinner 
            <Spinner
              animation="border"
              role="status"
              className="d-block mx-auto"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            // Display Images
            <Col md="10">
              {images.map((image) => (
                <div className="m-1 d-inline-block"  key={image.id} >
                  <Image
                    src={toImageSrc(image.img.data.data)}
                    width="200"
                    thumbnail
                    data-image-id={image.id}
                    onClick={handleShowModal}
                  />
                </div>
              ))}
            </Col>
            )}
          {/* Add Images Button  */}
          <Col md="2">
            <Button
              variant="success"
              type="button"
              onClick={handleAddImageLink}
            >
              Add Image
            </Button>
          </Col>
        </Row>
      </Container>
      <ImageDetailModel
        loading={modalLoading}
        show={modalShow}
        onHide={handleHideModel}
        image={selectedImage}
      />
    </>
  );
};

export default Images;

//Reference: https://javascriptio.com/view/60424/displaying-a-byte-array-as-an-image-using-javascript
function toImageSrc(arrayBuffer) {
  var arrayBufferView = new Uint8Array(arrayBuffer);
  var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
  var urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
}
