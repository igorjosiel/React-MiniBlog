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

        <div className={styles.todo_row}>
          <p>Teste</p>
          <p>Alta</p>
          <p>Médio</p>

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
      </div>
    </>
  );
};

export default Todo;
