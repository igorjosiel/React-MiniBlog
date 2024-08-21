import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Post from "./pages/Post/Post";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from "./pages/Search/Search";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import EditPost from "./pages/EditPost/EditPost";
import Todo from './pages/Todo/Todo';
import CreateTodo from './pages/CreateTodo/CreateTodo';

// components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Loading from './components/Loading';

// context
import AuthProvider from "./contexts/AuthContext";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Rotas padrão */}
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/search" element={<Search />} />

                {/* Rotas protegidas */}
                <Route
                  path="/posts/create"
                  element={
                    <ProtectedRoute user={user}>
                      <CreatePost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/posts/edit/:id"
                  element={
                    <ProtectedRoute user={user}>
                      <EditPost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute user={user}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/todo"
                  element={
                    <ProtectedRoute user={user}>
                      <Todo />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/todo/create"
                  element={
                    <ProtectedRoute user={user}>
                      <CreateTodo />
                    </ProtectedRoute>
                  }
                />

                {/* Rotas públicas */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute user={user}>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute user={user}>
                      <Register />
                    </PublicRoute>
                  }
                />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
