import React, { useRef } from 'react';
import { useCallback } from 'react';
import './App.css';

function App() {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const handleToDo = useCallback(() => {
    // if (newTodoRef.current) {
    //   dispatch({
    //     type: "ADD",
    //     text: newTodoRef.current.value,
    //   });
    //   newTodoRef.current.value = "";
    // }
  }, []);

  return (
    <div className="App">
        <h1 className="mb-10 text-3xl">To do App</h1>
        <div className="flex justify-center">
          <input className="w-4/6 text-blue-500 mx-3 py-1 px-2" type="text" ref={newTodoRef} />
          <button className="bg-white w-2/6 rounded text-gray-500 font-bold px-5 text-xl" onClick={handleToDo}>ADD</button>
        </div>
    </div>
  );
}

export default App;
