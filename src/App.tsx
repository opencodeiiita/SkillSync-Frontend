import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import './index.css';
// @ts-ignore
import Register from './pages/Register';


function App() {
  return (
    <Router>
      {/* Define routes in App.tsx */}
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* You can add more routes here, like login, home, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
