import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import styles from "./Home.module.css";

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h2>Veja os nossos posts mais recentes</h2>
      
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div className="post-list">
        {loading && <p>Carregando...</p>}

        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}

        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
