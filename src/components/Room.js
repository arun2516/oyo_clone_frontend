import React, { useState, useEffect } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom";


function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("currentUser")) {
      return JSON.parse(localStorage.getItem("currentUser"));
    } else {
      return false;
    }
  };
  return (
    <div className="row m-3 p-3 bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="img-fluid" />
      </div>
      <div className="col-md-8">
        <h1>{room.name}</h1>
        <p>Parking , Reception , Free Wifi</p>
        <p>
          <b>Max Count : {room.maxcount}</b>
        </p>
        <p>
          <b>Phonenumber : </b>
          {room.phonenumber}
        </p>
        <p>
          <b>Type : {room.type}</b>
        </p>
        <div style={{ float: "right" }}>
          {fromdate && todate && (
            <button
              className="btn btn-dark m-2"
              onClick={() => {
                if (isAuthenticated()) {
                  history.push(`/book/${room._id}/${fromdate}/${todate}`);
                } else {
                  alert(
                    "You have to be logged in to book your favourite rooms."
                  );
                }
              }}
            >
              Book Now
            </button>
          )}
          <button className="btn btn-danger m-2" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" data--aos="zoom-in">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel nextLabel="" prevLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    src={url}
                    className="img-fluid"
                    style={{ height: "400px" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Room;
