import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [todoText, setTodotext] = useState("");

  const onChangeTodoText = (e) => {
    setTodotext(e.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodo);
    setTodotext("");
  };

  const onClickDelete = (index) => {
    const newTodo = [...incompleteTodos];
    newTodo.splice(index, 1);
    setIncompleteTodos(newTodo);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodo = [...incompleteTodos];
    newIncompleteTodo.splice(index, 1);

    const newCompleteTodo = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodo);

    setIncompleteTodos(newIncompleteTodo);
  };

  const onClickReturn = (index) => {
    const newIncompleteTodo = [...incompleteTodos, completeTodos[index]];
    const newCompleteTodo = [...completeTodos];
    newCompleteTodo.splice(index, 1);

    setIncompleteTodos(newIncompleteTodo);
    setCompleteTodos(newCompleteTodo);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickReturn(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
