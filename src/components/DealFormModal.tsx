import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Deal } from './AdminDealsTable';

interface DealFormModalProps {
  deal?: Deal | null;
  onClose: () => void;
  onSave: (dealData: Partial<Deal>) => Promise<void>;
}

export default function DealFormModal({ deal, onClose, onSave }: DealFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Flights',
    destination: '',
    route: '',
    price_per_person: '',
    travel_start_date: '',
    travel_end_date: '',
    expires_at: '',
    image_url: '',
    image_alt: '',
    description: '',
    duration: '',
    group_size: '',
    accommodation: '',
    meals: '',
    is_active: true,
  });

  const [includesItems, setIncludesItems] = useState<string[]>(['']);
  const [highlightsItems, setHighlightsItems] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name,
        type: deal.type,
        destination: deal.destination,
        route: deal.route,
        price_per_person: deal.price_per_person.toString(),
        travel_start_date: deal.travel_start_date,
        travel_end_date: deal.travel_end_date,
        expires_at: deal.expires_at || '',
        image_url: deal.image_url,
        image_alt: deal.image_alt || '',
        description: deal.description || '',
        duration: deal.duration || '',
        group_size: deal.group_size || '',
        accommodation: deal.accommodation || '',
        meals: deal.meals || '',
        is_active: deal.is_active,
      });
      setIncludesItems(deal.includes && deal.includes.length > 0 ? deal.includes : ['']);
      setHighlightsItems(deal.highlights && deal.highlights.length > 0 ? deal.highlights : ['']);
    }
  }, [deal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dealData: any = {
        name: formData.name,
        type: formData.type,
        destination: formData.destination,
        route: formData.route,
        price_per_person: parseFloat(formData.price_per_person),
        travel_start_date: formData.travel_start_date,
        travel_end_date: formData.travel_end_date,
        expires_at: formData.expires_at || null,
        image_url: formData.image_url,
        image_alt: formData.image_alt || null,
        is_active: formData.is_active,
      };

      if (formData.type === 'Packages') {
        dealData.description = formData.description || null;
        dealData.duration = formData.duration || null;
        dealData.group_size = formData.group_size || null;
        dealData.accommodation = formData.accommodation || null;
        dealData.meals = formData.meals || null;
        dealData.includes = includesItems.filter((item) => item.trim() !== '');
        dealData.highlights = highlightsItems.filter((item) => item.trim() !== '');
      } else {
        dealData.description = null;
        dealData.duration = null;
        dealData.group_size = null;
        dealData.accommodation = null;
        dealData.meals = null;
        dealData.includes = null;
        dealData.highlights = null;
      }

      if (deal) {
        dealData.id = deal.id;
      }

      await onSave(dealData);
      onClose();
    } catch (error) {
      console.error('Error saving deal:', error);
      alert('Failed to save deal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addIncludesItem = () => {
    setIncludesItems([...includesItems, '']);
  };

  const removeIncludesItem = (index: number) => {
    setIncludesItems(includesItems.filter((_, i) => i !== index));
  };

  const updateIncludesItem = (index: number, value: string) => {
    const newItems = [...includesItems];
    newItems[index] = value;
    setIncludesItems(newItems);
  };

  const addHighlightsItem = () => {
    setHighlightsItems([...highlightsItems, '']);
  };

  const removeHighlightsItem = (index: number) => {
    setHighlightsItems(highlightsItems.filter((_, i) => i !== index));
  };

  const updateHighlightsItem = (index: number, value: string) => {
    const newItems = [...highlightsItems];
    newItems[index] = value;
    setHighlightsItems(newItems);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {deal ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Miami Beach Getaway"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="Flights">Flights</option>
                <option value="Packages">Packages</option>
                <option value="Cruises">Cruises</option>
                <option value="Hotels">Hotels</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Miami Beach"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Kingston → Miami"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Per Person (USD) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price_per_person}
                onChange={(e) => setFormData({ ...formData, price_per_person: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="299"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex items-center space-x-4 mt-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={formData.is_active}
                    onChange={() => setFormData({ ...formData, is_active: true })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!formData.is_active}
                    onChange={() => setFormData({ ...formData, is_active: false })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.travel_start_date}
                onChange={(e) => setFormData({ ...formData, travel_start_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.travel_end_date}
                onChange={(e) => setFormData({ ...formData, travel_end_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deal Expiry Date
                <span className="ml-2 text-xs text-gray-500 font-normal">(Optional — deal hides from the site after this date)</span>
              </label>
              <input
                type="date"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="https://images.pexels.com/..."
            />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Description
              <span className="ml-2 text-xs text-gray-500 font-normal">(Optional — describe the image for accessibility and SEO)</span>
            </label>
            <input
              type="text"
              value={formData.image_alt}
              onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Aerial view of Miami Beach coastline at sunset"
            />
          </div>

          {formData.type === 'Packages' && (
            <div className="border-t pt-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Package Details</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Detailed description of the package..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., 7 nights / 8 days"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size
                  </label>
                  <input
                    type="text"
                    value={formData.group_size}
                    onChange={(e) => setFormData({ ...formData, group_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Perfect for couples and families"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accommodation
                  </label>
                  <input
                    type="text"
                    value={formData.accommodation}
                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Deluxe oceanview room at 4-star resort"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meals
                  </label>
                  <input
                    type="text"
                    value={formData.meals}
                    onChange={(e) => setFormData({ ...formData, meals: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., All-inclusive (breakfast, lunch, dinner)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's Included
                </label>
                <div className="space-y-2">
                  {includesItems.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateIncludesItem(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., Round-trip flights"
                      />
                      <button
                        type="button"
                        onClick={() => removeIncludesItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIncludesItem}
                    className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highlights
                </label>
                <div className="space-y-2">
                  {highlightsItems.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateHighlightsItem(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., Private beach access"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlightsItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHighlightsItem}
                    className="flex items-center text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Highlight
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-lg hover:from-orange-600 hover:to-teal-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : deal ? 'Update Deal' : 'Create Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
