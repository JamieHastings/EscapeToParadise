import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Status = 'loading' | 'admin' | 'unauthorized' | 'unauthenticated';

async function resolveStatus(): Promise<Status> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return 'unauthenticated';
  const { data: isAdmin } = await supabase.rpc('is_admin');
  return isAdmin ? 'admin' : 'unauthorized';
}

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    resolveStatus().then(setStatus);

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      resolveStatus().then(setStatus);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  if (status === 'unauthorized') {
    supabase.auth.signOut();
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Authorized</h2>
          <p className="text-gray-600 mb-4">Your account does not have admin access.</p>
          <a href="/admin/login" className="text-orange-600 hover:underline">Back to login</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
