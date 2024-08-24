import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useAuthValue } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import styles from "./Todo.module.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  const { user } = useAuthValue();
  const uid = user.uid;

  const q = query(collection(db, "tasks"), where("uid", "==", uid));

  useEffect(() => {
    let isMounted = true;

    const getTasks = async () => {
      try {
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
  }, []);

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
            <div className={styles.todo_row}>
              <p>{task.task}</p>
              <p>{task.priority}</p>
              <p>{task.effort}</p>

              <div className={styles.actions}>
                <Link to={`/`} className="btn btn-outline">
                  Ver
                </Link>
                <Link to={`/`} className="btn btn-outline">
                  Editar
                </Link>

                <button
                  onClick={() => console.log('Teste')}
                  className="btn btn-outline btn-danger"
                >
                  Excluir
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
