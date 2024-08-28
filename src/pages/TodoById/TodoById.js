import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "./TodoById.module.css";

const TodoById = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Voltar uma página no histórico
  };

  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const getTasks = async () => {
      setLoading(true);

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
        if (isMounted) {
            setTask(null);
            setError('Houve algum erro ao processar o documento. Tente novamente mais tarde!');
          }
      } finally {
        setLoading(false);
      }
    };

    getTasks();

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
      
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TodoById;
