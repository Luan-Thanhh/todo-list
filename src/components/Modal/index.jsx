import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Modal.propTypes = {
  handleCloseModal: PropTypes.func,
  handleCloseDialog: PropTypes.func,
};

Modal.defaultProps = {
  handleCloseModal: null,
  handleCloseDialog: null,
};

function Modal(props) {
  const { handleCloseModal, handleCloseDialog } = props;

  const handleShowOverlay = () => {
    if (handleCloseModal) handleCloseModal();
    if (handleCloseDialog) handleCloseDialog();
  };

  return (
    <div className="modal">
      {props.children}
      <div className="modal__overlay fade-in" onClick={handleShowOverlay}></div>
    </div>
  );
}

export default Modal;
