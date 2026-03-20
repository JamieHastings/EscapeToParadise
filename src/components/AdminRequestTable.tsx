import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export interface FlightRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  from_city: string;
  to_city: string;
  departure_date: string;
  return_date: string | null;
  budget: number | null;
  travelers: number;
  preferred_time: string | null;
  notes: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface AdminRequestTableProps {
  requests: FlightRequest[];
  onDelete: (id: string) => void;
}

export default function AdminRequestTable({ requests, onDelete }: AdminRequestTableProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatBudget = (budget: number | null) => {
    if (!budget) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(budget);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-orange-500 to-teal-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">From</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">To</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Departure</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Return</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Budget</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Travelers</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                  No flight requests yet
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/requests/${request.id}`)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {request.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{request.from_city}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{request.to_city}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(request.departure_date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {request.return_date ? formatDate(request.return_date) : 'One-way'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatBudget(request.budget)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{request.travelers}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(request.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/requests/${request.id}`);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to delete this request?')) {
                            onDelete(request.id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
