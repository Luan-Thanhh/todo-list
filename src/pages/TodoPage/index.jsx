import React, { useState } from 'react';
import CreateTodoForm from './components/CreateTodoForm';
import DeadlineTodo from './components/DeadlineTodo';
import RemoveConfirmDialog from './components/RemoveConfirmDialog';
import TodoTable from './components/TodoTable';
import './styles.scss';

function TodoPage(props) {
  const [todoList, setTodoList] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('todoList'));

    return storageJobs || [];
  });
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [todoId, setTodoId] = useState(0);

  // Handle event click todo completed
  const handleClickTodo = (id, status) => {
    const index = todoList.findIndex((todo) => todo.id === id);

    const todoListClone = [...todoList];
    todoListClone.splice(index, 1, {
      ...todoListClone[index],
      status: status,
    });

    const jsonTodoList = JSON.stringify(todoListClone);
    localStorage.setItem('todoList', jsonTodoList);

    setTodoList(todoListClone);
  };

  // Create new todo
  const handleCreateTodo = (formValues) => {
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
      status: 'uncompleted',
    };

    // setTodoList((prev) => [...prev, newTodo]);
    setTodoList((prev) => {
      const newTodoList = [...prev, newTodo];

      const jsonTodoList = JSON.stringify(newTodoList);
      localStorage.setItem('todoList', jsonTodoList);

      return newTodoList;
    });

    console.log(todoList);

    setShowModal(false);
  };

  // Remove todo
  const handleRemoveTodo = () => {
    if (todoId <= 0) return;

    const index = todoList.findIndex((todo) => todo.id === todoId);

    const todoListClone = [...todoList];
    todoListClone.splice(index, 1);

    const jsonTodoList = JSON.stringify(todoListClone);
    localStorage.setItem('todoList', jsonTodoList);

    setTodoList(todoListClone);
  };

  // Update todo
  const handleUpdateTodo = ({ id }, updateTodo) => {
    const index = todoList.findIndex((todo) => todo.id === id);

    const todoListClone = [...todoList];
    todoListClone.splice(index, 1, {
      ...updateTodo,
    });

    const jsonTodoList = JSON.stringify(todoListClone);
    localStorage.setItem('todoList', jsonTodoList);

    setTodoList(todoListClone);
    setShowDialog(false);
  };

  // Handle search todos
  const handleSearchTodo = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  // Handle show modal and dialog
  const handleShowModal = () => setShowModal(true);
  const handleShowDialog = () => setShowDialog(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseDialog = () => setShowDialog(false);

  // Filter todos
  const todoListFilter = todoList
    .filter((todo) => filters === '' || todo.status === filters)
    .filter((todo) => search === '' || todo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="todo-page">
      <TodoTable
        search={search}
        setTodoId={setTodoId}
        todoList={todoListFilter}
        handleClickTodo={handleClickTodo}
        handleShowAll={() => setFilters('')}
        handleShowCompleted={() => setFilters('completed')}
        handleShowUncompleted={() => setFilters('uncompleted')}
        handleRemoveTodo={handleRemoveTodo}
        handleUpdateTodo={handleUpdateTodo}
        handleSearchTodo={handleSearchTodo}
        handleShowModal={handleShowModal}
        handleShowDialog={handleShowDialog}
      />

      {showModal && (
        <CreateTodoForm handleCloseModal={handleCloseModal} handleCreateTodo={handleCreateTodo} />
      )}

      {showDialog && (
        <RemoveConfirmDialog
          handleCloseDialog={handleCloseDialog}
          handleRemoveTodo={handleRemoveTodo}
        />
      )}

      <DeadlineTodo todoList={todoListFilter} />
    </div>
  );
}

export default TodoPage;
