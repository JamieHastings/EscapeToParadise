import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Home from './pages/Home';
import RequestFlight from './pages/RequestFlight';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import PlanTrip from './pages/PlanTrip';
import SearchFlights from './pages/SearchFlights';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminDeals from './pages/AdminDeals';
import RequestDetail from './pages/RequestDetail';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/deals" element={<AdminDeals />} />
          <Route path="/admin/requests/:id" element={<RequestDetail />} />
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="request-flight" element={<RequestFlight />} />
            <Route path="deals" element={<Deals />} />
            <Route path="contact" element={<Contact />} />
            <Route path="plan-trip" element={<PlanTrip />} />
            <Route path="search-flights" element={<SearchFlights />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
