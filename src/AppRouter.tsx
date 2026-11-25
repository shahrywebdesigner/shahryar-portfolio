import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import ProjectsPage from './pages/ProjectsPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}