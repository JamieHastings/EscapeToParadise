import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RequestFlight from './pages/RequestFlight';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminDeals from './pages/AdminDeals';
import RequestDetail from './pages/RequestDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/deals" element={<AdminDeals />} />
          <Route path="/admin/requests/:id" element={<RequestDetail />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/request-flight" element={<RequestFlight />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
