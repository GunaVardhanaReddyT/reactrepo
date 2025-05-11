import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Home2 from './Home2';
import Theaterhome from './Theaterhome';
import Seatallocation from './Seatallocation';
import Payment from './Payment'; // Import the new Payment component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Home2 />} />
        <Route path="/theater" element={<Theaterhome />} />
        <Route path="/seat-allocation" element={<Seatallocation />} />
        <Route path="/payment" element={<Payment />} /> {/* Add route for Payment */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;