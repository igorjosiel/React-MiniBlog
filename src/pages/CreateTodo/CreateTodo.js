import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";
import styles from "./CreateTodo.module.css";
import { addTaskAction } from "../../services/actions/tasksActions";

const CreateTodo = () => {
  const [formData, setFormData] = useState({
    task: "",
    priority: "",
    effort: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [idTask, setIdTask] = useState(null);

  const { user } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error && idTask) {
      navigate("/todo");
    }
  }, [error, message, idTask, navigate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { task, priority, effort } = formData;
    const randomNumber = Math.floor(Math.random() * 10);

    setLoading(true);

    const { message, success, idTask } = await addTaskAction({
      task,
      priority,
      effort,
      uid: user.uid,
      createdBy: user.displayName,
      id: randomNumber,
    });

    setLoading(false);
    setMessage(message);
    setError(!success);
    setIdTask(idTask);
  };

  return (
    <div className={styles.create_todo}>
      <h2>Criar tarefa</h2>
      <p>Crie a sua próxima tarefa e não a deixe para depois!</p>
      
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="task"
            required
            placeholder="Pense em uma tarefa..."
            onChange={handleChange}
            value={formData.task}
          />
        </label>
        <label>
          <span>Prioridade:</span>
          <input
            type="text"
            name="priority"
            required
            placeholder="Digite a prioridade"
            onChange={handleChange}
            value={formData.priority}
          />
        </label>
        <label>
          <span>Esforço:</span>
          <input
            type="text"
            name="effort"
            required
            placeholder="Insira o conteúdo do post"
            onChange={handleChange}
            value={formData.effort}
          ></input>
        </label>

        <button className="btn">Criar tarefa</button>
        
        {loading && <Loading />}
        
        {error && <p className="error">{message}</p>}
      </form>
    </div>
  );
};

export default CreateTodo;
