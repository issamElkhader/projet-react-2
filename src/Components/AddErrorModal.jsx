import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function AddErrorModal(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="w-100 d-flex justify-content-center">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="display-6 text-danger"
            ></FontAwesomeIcon>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center text-dark mt-3"
          style={{ fontWeight: "bold" }}
        >
          {props.msg}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center mt-3">
          <Button variant="danger" onClick={props.handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
