import { Link } from "react-router-dom";
// import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// import { useDeleteDocument } from "../../hooks/useDeleteDocument";
// import { useAuthValue } from "../../contexts/AuthContext";
import styles from "./Todo.module.css";

const Todo = () => {
  return (
    <div className={styles.todo}>
      <h2>A Fazer</h2>
      <p>Gerencie as suas tarefas a fazer</p>

      <Link to="/" className="btn">
        Nova Tarefa
      </Link>
    </div>
  );
};

export default Todo;
