import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../components/Modal';
import './styles.scss';

CreateTodoForm.propTypes = {
  handleCreateTodo: PropTypes.func,
  handleCloseModal: PropTypes.func.isRequired,
};

CreateTodoForm.defaultProps = {
  handleCreateTodo: null,
};

function CreateTodoForm(props) {
  const { handleCreateTodo, handleCloseModal } = props;

  const [job, setJob] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showError, setShowError] = useState(false);
  const createInput = useRef(null);

  const handleChangeJob = (e) => {
    const value = e.target.value;

    setJob(value);

    if (job.trim().length >= 0) setShowError(false);
  };

  const handleChangeDeadline = (e) => {
    const value = e.target.value;

    setDeadline(value);
  };

  // Handle submit when click button create todo
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(deadline);

    if (job.trim().length === 0) {
      setJob('');
      setShowError(true);
      createInput.current.focus();

      return;
    } else {
      if (!handleCreateTodo) return;

      const formsValue = {
        title: job,
        deadline: deadline,
      };

      handleCreateTodo(formsValue);
      setJob('');
    }
  };

  return (
    <Modal handleCloseModal={handleCloseModal}>
      <form className="create-todo move-in-top">
        <div className={`${'create-todo__input'}${showError ? ' error' : ''}`}>
          <input
            type="text"
            placeholder="Enter todo..."
            value={job}
            onChange={(e) => handleChangeJob(e)}
            ref={createInput}
            autoFocus
          />
          {showError && <small>Please enter todo!!</small>}

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => handleChangeDeadline(e)}
          />
        </div>

        <div className="create-todo__btn">
          <button onClick={(e) => handleSubmit(e)}>Create</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateTodoForm;
