import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Modal from '../../../../components/Modal';

RemoveConfirmDialog.propTypes = {
  handleCloseDialog: PropTypes.func,
  handleRemoveTodo: PropTypes.func.isRequired,
};

RemoveConfirmDialog.defaultProps = {
  handleCloseDialog: null,
};

function RemoveConfirmDialog(props) {
  const { handleCloseDialog, handleRemoveTodo } = props;

  const handleSaveRemove = () => {
    handleRemoveTodo();
    handleCloseDialog();
  };

  return (
    <Modal handleCloseDialog={handleCloseDialog}>
      <div className="dialog-todo move-in-top">
        <h1>Are you sure you want to remove it?</h1>

        <div className="dialog-todo__btn">
          <button onClick={handleSaveRemove}>Save</button>
          <button onClick={handleCloseDialog}>Close</button>
        </div>
      </div>
    </Modal>
  );
}

export default RemoveConfirmDialog;
