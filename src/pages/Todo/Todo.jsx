import { Link } from "react-router-dom";
// import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// import { useDeleteDocument } from "../../hooks/useDeleteDocument";
// import { useAuthValue } from "../../contexts/AuthContext";
import styles from "./Todo.module.css";

const Todo = () => {
  return (
    <>
      <div className={styles.todo}>
        <h2>A Fazer</h2>
        <p>Gerencie as suas tarefas a fazer</p>

        <Link to="/" className="btn">
          Nova Tarefa
        </Link>

        <div className={styles.todo_header}>
          <span>Tarefa</span>
          <span>Prioridade</span>
          <span>Esforço</span>
          <span>Ações</span>
        </div>
      </div>
    </>
  );
};

export default Todo;
