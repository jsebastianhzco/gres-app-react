import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import Tables from './pages/Tables';
import Certificados from './pages/Certificados';
import Cobros from './pages/Certificados';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/certificados-de-recoleccion" element={<Certificados />} />
          <Route path="/cuentas-de-cobro" element={<Cobros />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;