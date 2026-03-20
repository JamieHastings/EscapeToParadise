import { CreditCard as Edit, Trash2, ToggleLeft, ToggleRight, Copy } from 'lucide-react';

export interface Deal {
  id: string;
  name: string;
  type: string;
  destination: string;
  route: string;
  price_per_person: number;
  travel_start_date: string;
  travel_end_date: string;
  image_url: string;
  description: string | null;
  includes: string[] | null;
  duration: string | null;
  group_size: string | null;
  accommodation: string | null;
  meals: string | null;
  highlights: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AdminDealsTableProps {
  deals: Deal[];
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
  onDuplicate: (deal: Deal) => void;
}

export default function AdminDealsTable({
  deals,
  onEdit,
  onDelete,
  onToggleActive,
  onDuplicate,
}: AdminDealsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-orange-500 to-teal-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Deal Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Destination</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Travel Dates</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deals.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No deals yet. Click "Add New Deal" to create your first deal.
                </td>
              </tr>
            ) : (
              deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {deal.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {deal.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{deal.destination}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatPrice(deal.price_per_person)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(deal.travel_start_date)} - {formatDate(deal.travel_end_date)}
                  </td>
                  <td className="px-6 py-4">
                    {deal.is_active ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onToggleActive(deal.id, deal.is_active)}
                        className={`p-2 ${
                          deal.is_active
                            ? 'text-gray-600 hover:bg-gray-50'
                            : 'text-green-600 hover:bg-green-50'
                        } rounded-lg transition-colors`}
                        title={deal.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {deal.is_active ? (
                          <ToggleRight className="w-4 h-4" />
                        ) : (
                          <ToggleLeft className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => onEdit(deal)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit deal"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDuplicate(deal)}
                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        title="Duplicate deal"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this deal? This action cannot be undone.'
                            )
                          ) {
                            onDelete(deal.id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete deal"
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
