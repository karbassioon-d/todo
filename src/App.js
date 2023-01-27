import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'; //unique id for the todos
import './assets/css/style.css'
import './index.css'
import { gsap } from 'gsap';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()
    //these two "useEffect()" store the data between page refresh
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    //toggling todo's
    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }


    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value= null
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    //Headingg animation code below
    const h1Ref = useRef(null);
    const inputRef = useRef(null);
    const button1Ref = useRef(null);
    const button2Ref = useRef(null);
    const left2doRef = useRef(null);
    const todoRef = useRef(null);

    useEffect(() => {
        const elementsToAnimate = gsap.utils.toArray([h1Ref.current, inputRef.current, button1Ref.current, button2Ref.current, left2doRef.current, todoRef.current])
        gsap.fromTo(elementsToAnimate, { duration: 2.5, opacity: 0, y: 50, ease: 'expo'}, {opacity: 1, y: 0, stagger: 0.1})
}, []);

    return (
        <div className='big-boi-div flex-col justify-center items-center flex' >
            <h1  ref={h1Ref} className="mt-20 mb-3 text-3xl flex flex-col justify-center items-center text-white">What are you doing today?</h1>
            <div ref={inputRef}>
                <input  placeholder="Type your todos" className='flex-col justify-center items-center inputBox' ref={todoNameRef} type="text"/>
            </div>
            {/*<input MAYBE ADD CATEGORY FOR EACH TODO HERE />*/}
            <div className='flex justify-evenly w-2/3 '>
                <button ref={button1Ref} className="btn justify-evenly" onClick={handleAddTodo}>Add Todo</button>
                <button ref={button2Ref} className="btn justify-evenly" onClick={handleClearTodos}>Clear Finished</button>
            </div>
            <div ref={left2doRef}> {todos.filter(todo => !todo.complete).length} left to do</div>
            <div ref={todoRef}>
                <TodoList todos={todos} toggleTodo={toggleTodo}/>
            </div>
            <svg className="wave"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5000ca" fill-opacity="1" d="M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,192C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
    )
}

export default App;