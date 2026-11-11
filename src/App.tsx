import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Calculator } from '@/pages/Calculator';
import { Results } from '@/pages/Results';
import { Recommendations } from '@/pages/Recommendations';
import { Insights } from '@/pages/Insights';
import { About } from '@/pages/About';
import { AppShell } from '@/components/AppShell';

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          element={
            <AppShell mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
          }
        >
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/results" element={<Results />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
