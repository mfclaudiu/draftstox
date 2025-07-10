import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Landing } from './pages/Landing';
import { QuizPage } from './pages/QuizPage';
import { Dashboard } from './pages/Dashboard';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { QuizProvider } from './contexts/QuizContext';
import { SEOHead } from './components/SEOHead';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <QuizProvider>
          <SEOHead />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </QuizProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;