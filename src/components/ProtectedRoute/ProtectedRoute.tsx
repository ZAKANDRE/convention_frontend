import { useAuth } from '../../context/AuthContext.tsx';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner.tsx'


export default function ProtectedRoute({ children }) {
  const { userInfo, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />; // или <Loading />
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
