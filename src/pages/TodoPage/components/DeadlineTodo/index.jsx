import React from 'react';
import PropTypes from 'prop-types';

DeadlineTodo.propTypes = {
  todoList: PropTypes.func.isRequired,
};

function DeadlineTodo(props) {
  const { todoList } = props;
  console.log(todoList);
  return <div></div>;
}

export default DeadlineTodo;
