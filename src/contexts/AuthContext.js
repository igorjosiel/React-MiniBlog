import { useContext, createContext } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

const AuthProvider = ({ children, value }) => {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthValue deve ser usado dentro de um AuthProvider');
  }

  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired,
}

export default AuthProvider;
