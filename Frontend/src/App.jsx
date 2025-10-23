import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Homepage from './components/Homepage';
import Register from './components/Register';
import LiveKitModal from './components/LiveKitModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
         <Route path="/LiveKitModal" element={<LiveKitModal />} />
      </Routes>
    </Router>
  );
}

export default App;
