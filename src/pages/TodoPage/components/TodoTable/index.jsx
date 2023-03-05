import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faPenToSquare,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { computeHeadingLevel } from '@testing-library/react';

TodoTable.propTypes = {
  search: PropTypes.string.isRequired,
  todoList: PropTypes.array.isRequired,
  setTodoId: PropTypes.func.isRequired,
  handleClickTodo: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
  handleShowCompleted: PropTypes.func.isRequired,
  handleShowUncompleted: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  handleSearchTodo: PropTypes.func.isRequired,
  handleShowModal: PropTypes.func.isRequired,
  handleShowDialog: PropTypes.func.isRequired,
};

function TodoTable(props) {
  const {
    search,
    setTodoId,
    todoList,
    handleClickTodo,
    handleShowAll,
    handleShowCompleted,
    handleShowUncompleted,
    handleUpdateTodo,
    handleSearchTodo,
    handleShowModal,
    handleShowDialog,
  } = props;

  const [updateTodo, setUpdateTodo] = useState({});
  const [checkClickUpdate, setCheckClickUpdate] = useState(false);

  const inputUpdateError = useRef();
  const widthTodo = useRef();

  const isEmptyObj = Object.keys(updateTodo).length === 0;

  // Handle event lick button update todo
  const handleClickUpdate = (todo, updateTodo) => {
    if (isEmptyObj === false && todo.id === updateTodo.id) {
      const todoTitle = updateTodo.title.trim();

      console.log(todoTitle.length);

      if (todoTitle.length === 0 || todoTitle.length > 80) {
        setCheckClickUpdate(true);

        inputUpdateError.current.focus();
        return;
      }
      updateTodo.title = todoTitle;

      handleUpdateTodo(todo, updateTodo);
      setUpdateTodo({});
    } else {
      setUpdateTodo(todo);
      setCheckClickUpdate(false);
    }
  };

  // Handle set value update todo
  const handleOnChangeUpdateTodo = (e) => {
    const updateTodoClone = { ...updateTodo };
    updateTodoClone.title = e.target.value;

    if (e.target.value.length > 0) setCheckClickUpdate(false);

    setUpdateTodo(updateTodoClone);
  };

  // Handle click remove todo
  const handleClickRemoveTodo = (id) => {
    handleShowDialog();
    setTodoId(id);
  };

  return (
    <div className="todo-table">
      <div className="todo-table__header">
        <h1>Todo</h1>

        <div className="todo-table__form">
          <input
            type="text"
            placeholder="Search keywords or todo..."
            value={search}
            onChange={(e) => handleSearchTodo(e)}
          />
          <button onClick={handleShowModal}>Create todo</button>
        </div>
      </div>

      <div className="todo-table__show">
        <button className="todo-table__show--all-btn" onClick={handleShowAll}>
          All
        </button>
        <button
          className="todo-table__show--todo-btn"
          onClick={handleShowCompleted}
        >
          Completed
        </button>
        <button
          className="todo-table__show--done-btn"
          onClick={handleShowUncompleted}
        >
          Uncompleted
        </button>
      </div>

      <ul className="todo-table__list">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className={`${'todo-table__item move-in-top'} ${
              isEmptyObj === false && todo.id === updateTodo.id
                ? 'active-update'
                : ''
            } ${
              checkClickUpdate && todo.id === updateTodo.id
                ? 'error-update'
                : ''
            }`}
          >
            {isEmptyObj ? (
              <div className="todo-table__text">
                <p
                  ref={widthTodo}
                  className={`todo-table__job ${
                    todo.status === 'completed' ? 'completed' : ''
                  }`}
                  onClick={() =>
                    handleClickTodo(
                      todo.id,
                      todo.status === 'uncompleted'
                        ? 'completed'
                        : 'uncompleted'
                    )
                  }
                >
                  {todo.title}
                </p>
                <p className="todo-table__deadline">
                  {todo.deadline.replace('T', ' ')}
                </p>
              </div>
            ) : (
              <>
                {todo.id === updateTodo.id ? (
                  <input
                    type="text"
                    value={updateTodo.title}
                    onChange={(e) => handleOnChangeUpdateTodo(e)}
                    ref={inputUpdateError}
                    autoFocus
                  />
                ) : (
                  <div className="todo-table__text">
                    <p
                      ref={widthTodo}
                      className={`todo-table__job ${
                        todo.status === 'completed' ? 'completed' : ''
                      }`}
                      onClick={() =>
                        handleClickTodo(
                          todo.id,
                          todo.status === 'uncompleted'
                            ? 'completed'
                            : 'uncompleted'
                        )
                      }
                    >
                      {todo.title}
                    </p>
                    <p className="todo-table__deadline">
                      {todo.deadline.replace('T', ' ')}
                    </p>
                  </div>
                )}
              </>
            )}

            <button onClick={() => handleClickRemoveTodo(todo.id)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button onClick={() => handleClickUpdate(todo, updateTodo)}>
              {isEmptyObj === false && todo.id === updateTodo.id ? (
                <FontAwesomeIcon icon={faSave} />
              ) : (
                <FontAwesomeIcon icon={faPenToSquare} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoTable;
