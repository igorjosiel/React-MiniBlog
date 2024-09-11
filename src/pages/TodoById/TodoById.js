import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { getTaskByIdAction } from '../../services/actions/tasksActions';
import styles from "./TodoById.module.css";

const TodoById = () => {
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Voltar uma página no histórico
  };

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    const getTask = async () => {
      const { message, success, data } = await getTaskByIdAction(id);
  
      if (isMounted) {
        setLoading(false);
        setTask(data);
        setMessage(message);
        setError(!success);
      }
    };
  
    getTask();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className={styles.todoById_container}>
      {task && (
        <>
          <h2>{task.task}</h2>
          <p>Criou a tarefa: {task.createdBy}</p>
          <p>Esforço: {task.effort}</p>
          <p>Prioridade: {task.priority}</p>

          <button className="btn" onClick={goBack}>Voltar</button>
        </>
      )}

      {loading && <Loading />}
      
      {error && <p className="error">{message}</p>}
    </div>
  );
};

export default TodoById;
