import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Users, DollarSign, Clock, FileText, Save } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { FlightRequest } from './AdminRequestTable';

interface RequestDetailPanelProps {
  request: FlightRequest;
  onUpdate: (id: string, updates: Partial<FlightRequest>) => Promise<void>;
}

export default function RequestDetailPanel({ request, onUpdate }: RequestDetailPanelProps) {
  const [status, setStatus] = useState(request.status);
  const [adminNotes, setAdminNotes] = useState(request.admin_notes || '');
  const [saving, setSaving] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdate(request.id, { status, admin_notes: adminNotes });
    } catch (error) {
      console.error('Failed to update request:', error);
      alert('Failed to update request. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
          <StatusBadge status={status} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{request.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a
                  href={`mailto:${request.email}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {request.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <a
                  href={`tel:${request.phone}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {request.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Flight Details</h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-medium text-gray-900">{request.from_city}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">To</p>
                <p className="font-medium text-gray-900">{request.to_city}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-teal-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Departure Date</p>
                <p className="font-medium text-gray-900">{formatDate(request.departure_date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-teal-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Return Date</p>
                <p className="font-medium text-gray-900">
                  {request.return_date ? formatDate(request.return_date) : 'One-way flight'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Number of Travelers</p>
                <p className="font-medium text-gray-900">{request.travelers}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="font-medium text-gray-900">{formatBudget(request.budget)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Preferred Flight Time</p>
                <p className="font-medium text-gray-900">
                  {request.preferred_time || 'No preference'}
                </p>
              </div>
            </div>
          </div>

          {request.notes && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Notes</h3>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-teal-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-700 whitespace-pre-wrap">{request.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Request Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label htmlFor="adminNotes" className="block text-sm font-medium text-gray-700 mb-2">
              Internal Notes
            </label>
            <textarea
              id="adminNotes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Add internal notes about this request..."
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>Created:</strong> {formatDate(request.created_at)}
        </p>
        <p className="mt-1">
          <strong>Last Updated:</strong> {formatDate(request.updated_at)}
        </p>
      </div>
    </div>
  );
}
