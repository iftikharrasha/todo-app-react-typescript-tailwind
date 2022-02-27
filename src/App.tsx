import React, { useRef, useReducer, useCallback } from 'react';
import { useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
}

type ActionType = { type: "ADD"; text: string } | { type: "REMOVE"; id: number };

const todoCart: Todo[] = JSON.parse(localStorage.getItem('todoCart') || '[]');
const initialState: Todo[] = (todoCart === null) ? [] : todoCart;

function App() {
  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [...state, {id: state.length, text: action.text}];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }

  const [newToDos, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todoCart', JSON.stringify(newToDos));
  }, [newToDos]);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleToDo = useCallback(() => {
    if (inputRef.current) {
      dispatch({
        type: "ADD",
        text: inputRef.current.value,
      });
      inputRef.current.value = "";
    }
  }, []);

  return (
    <div className="App min-h-screen bg-slate-900 text-center flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl text-violet-700 font-bold">Mandatory To do App</h1>
        <p className="text-lg mb-10 text-gray-400">A to do app made with typescript and pre redux..</p>
        <div className="flex justify-center">
          <input className="w-4/6 text-violet-900 focus:outline-none mx-2 py-1 px-2 rounded-lg" type="text" ref={inputRef} />
          <button className="w-2/6 bg-teal-700 hover:bg-violet-600 rounded-lg text-white-500 font-bold px-5 text-lg" onClick={handleToDo}>ADD</button>
        </div>
        <ul className="my-4 flex flex-col items-start justify-start">
          {newToDos.map((todo) => (
              <li className="flex justify-between my-2" key={todo.id}>
                <p>📋 {todo.text}</p>
                <span className="px-5 text-sm cursor-pointer" onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>⛔️</span>
              </li>
          ))}
        </ul>
    </div>
  );
}

export default App;
