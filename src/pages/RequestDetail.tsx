import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { authService } from '../lib/auth';
import RequestDetailPanel from '../components/RequestDetailPanel';
import type { FlightRequest } from '../components/AdminRequestTable';

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<FlightRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    if (id) {
      loadRequest(id);
    }
  }, [id]);

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      navigate('/admin/login');
    }
  };

  const loadRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('flight_requests')
        .select('*')
        .eq('id', requestId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        alert('Request not found');
        navigate('/admin/dashboard');
        return;
      }

      setRequest(data);
    } catch (error) {
      console.error('Error loading request:', error);
      alert('Failed to load request');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (requestId: string, updates: Partial<FlightRequest>) => {
    try {
      const { error } = await supabase
        .from('flight_requests')
        .update(updates)
        .eq('id', requestId);

      if (error) throw error;

      if (request) {
        setRequest({ ...request, ...updates });
      }

      alert('Request updated successfully');
    } catch (error) {
      console.error('Error updating request:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading request...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-white hover:text-orange-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">Flight Request Details</h1>
          <p className="mt-1 text-orange-100">Request ID: {request.id}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RequestDetailPanel request={request} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}
