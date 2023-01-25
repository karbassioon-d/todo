import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
  return (
    <div className='checkboxContainer'>
        <label className="container">
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input>
            {todo.name}
            <div className="checkmark"></div>
        </label>
        
    </div>
  )
}
