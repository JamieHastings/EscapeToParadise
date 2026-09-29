import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RequestFlight from './pages/RequestFlight';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import PlanTrip from './pages/PlanTrip';
import SearchFlights from './pages/SearchFlights';
import RequestDeal from './pages/RequestDeal';

// In a public build VITE_APP_MODE is undefined, so this resolves to null at build time.
// Vite sees a statically-false branch and drops the admin import entirely — no admin
// chunks in the public bundle.
const AdminApp =
  import.meta.env.VITE_APP_MODE === 'admin'
    ? lazy(() => import('./admin/AdminApp'))
    : null;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

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

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
    </div>
  );
}

function App() {
  if (AdminApp) {
    return (
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<Spinner />}>
            <AdminApp />
          </Suspense>
        </Router>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="request-flight" element={<RequestFlight />} />
              <Route path="deals" element={<Deals />} />
              <Route path="contact" element={<Contact />} />
              <Route path="plan-trip" element={<PlanTrip />} />
              <Route path="search-flights" element={<SearchFlights />} />
              <Route path="request-deal" element={<RequestDeal />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
