import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DsDevPage from './pages/ds-dev';
import LandingPage from './pages/landing';
import ReleaseNotes from './pages/ReleaseNotes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/release-notes" element={<ReleaseNotes />} />
        <Route path="/ds-dev/*" element={<DsDevPage />} />
<Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
