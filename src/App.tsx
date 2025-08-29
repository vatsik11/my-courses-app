import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import HomePage from '@pages/Home';
import AuthPage from '@pages/Auth';
import Header from '@pages//Header';
import ProtectedRoute from '@components/ProtectedRoute';
import { useAppSelector } from '@app/store/hooks';

export default function App() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <Container maxWidth="xl" >
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" replace />}
          />

          <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
        </Routes>
      </main>
    </Container>
  );
}
