import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../contexts/AuthContext";
// import Loading from "../../components/Loading";
import styles from "./CreateTodo.module.css";

const CreateTodo = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [effort, setEffort] = useState("");
  // const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  // const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("tasks");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormError("");

    // check values
    if (!task) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if(formError) return;

    insertDocument({
      task,
      priority,
      effort,
      uid: user.uid,
      createdBy: user.displayName,
    });
  };

  return (
    <div className={styles.create_post}>
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
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </label>
        <label>
          <span>Prioridade:</span>
          <input
            type="text"
            name="priority"
            required
            placeholder="Digite a prioridade"
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          />
        </label>
        <label>
          <span>Esforço:</span>
          <input
            type="text"
            name="effort"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setEffort(e.target.value)}
            value={effort}
          ></input>
        </label>

       <button className="btn">Criar tarefa</button>
        
        {/* {response.loading && <Loading />}
        
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )} */}
      </form>
    </div>
  );
};

export default CreateTodo;
