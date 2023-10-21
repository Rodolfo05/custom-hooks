import { useEffect, useReducer } from "react";
import {todoReducer} from './todoReducer';


const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

export const useTodo = (initialState = []) => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
    

    const handleNewTodo = (todo) => {
        //Creo la accion
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        //Se la mando al dispatch
        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }
    
    const handleToggleTodo = (id) => {

        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }



    const pendingTodosCount = () => {

    }


  return{
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo
  }
}
