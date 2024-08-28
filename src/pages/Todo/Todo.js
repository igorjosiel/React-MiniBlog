import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthValue } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import styles from "./Todo.module.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  const { user } = useAuthValue();
  const uid = user.uid;

  useEffect(() => {
    let isMounted = true;

    const getTasks = async () => {
      try {
        const q = query(collection(db, "tasks"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const tasksArray = [];
        
        querySnapshot.forEach((doc) => {
          tasksArray.push(doc.data());
        });
  
        if (isMounted) setTasks(tasksArray);
      } catch (error) {
        setTasks([]);
      }
    };
  
    getTasks();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  return (
    <>
      <div className={styles.todo}>
        <h2>A Fazer</h2>
        <p>Gerencie as suas tarefas a fazer</p>

        <Link to="/todo/create" className="btn">
          Nova Tarefa
        </Link>

        <div className={styles.todo_header}>
          <span>Tarefa</span>
          <span>Prioridade</span>
          <span>Esforço</span>
          <span>Ações</span>
        </div>

        {tasks &&
          tasks.map((task) => (
            <div className={styles.todo_row} key={task.id}>
              <p>{task.task}</p>
              <p>{task.priority}</p>
              <p>{task.effort}</p>

              <div className={styles.actions}>
                <Link to={`/todos/${task.id}`}>
                  <FaBook title="Visualizar" size={20} color="#6E6E6E" />
                </Link>
                <Link to={`/todos/edit/${task.id}`}>
                  <FaPencilAlt title="Editar" size={20} color="#1E90FF" />
                </Link>

                <button
                  onClick={() => console.log('Teste')}
                >
                  <FaTrashAlt title="Excluir" size={20} color="#FF4500" />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Todo;
