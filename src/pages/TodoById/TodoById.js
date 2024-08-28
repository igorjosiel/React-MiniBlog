import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "./TodoById.module.css";

const TodoById = () => {
  const [task, setTask] = useState(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Voltar uma página no histórico
  };

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const getTasks = async () => {
      try {
        const q = query(collection(db, "tasks"), where("id", "==", Number(id)));
        const querySnapshot = await getDocs(q);
        const tasksArray = [];

        querySnapshot.forEach((doc) => {
          tasksArray.push(doc.data());
        });

        if (isMounted) {
          setTask(tasksArray.length > 0 ? tasksArray[0] : null);
        }
      } catch (error) {
        console.error("Error fetching task: ", error);
        if (isMounted) setTask(null);
      }
    };

    getTasks();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className={styles.todoById_container}>
      {task ? (
        <>
          <h2>{task.task}</h2>
          <p>Criou a tarefa: {task.createdBy}</p>
          <p>Esforço: {task.effort}</p>
          <p>Prioridade: {task.priority}</p>

          <button className="btn" onClick={goBack}>Voltar</button>
        </>
      ) : (
        <p>Task not found or loading...</p>
      )}
    </div>
  );
};

export default TodoById;
