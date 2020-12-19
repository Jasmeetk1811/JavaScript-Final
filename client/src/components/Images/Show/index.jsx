import React, {useContext, useEffect, useState} from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const ImageDetailModel = (props) => {
  const { image, loading } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {
        loading ? (
          <Spinner
              animation="border"
              role="status"
              className="d-block mx-auto"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
        ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  By { image.author } - At { image.date && (new Date(image.date).toDateString()) }
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="mx-auto">
                <h4>{ image.caption }</h4>
                <img src={image.img && toImageSrc(image.img.data.data)} width="500" alt={image.author}/>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </>
        )
      }
     
    </Modal>
  )
}

export default ImageDetailModel;

function toImageSrc(arrayBuffer) {
  var arrayBufferView = new Uint8Array(arrayBuffer);
  var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
  var urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
}