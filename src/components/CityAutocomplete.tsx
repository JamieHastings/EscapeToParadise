import { useState, useEffect, useRef } from 'react';
import { MapPin, Plane } from 'lucide-react';
import { airports, popularDestinations, Airport } from '../data/airports';

interface CityAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string, airport?: Airport) => void;
  placeholder?: string;
  required?: boolean;
  label: string;
}

export default function CityAutocomplete({
  id,
  value,
  onChange,
  placeholder = 'e.g., New York or JFK',
  required = false,
  label,
}: CityAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showPopular, setShowPopular] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowPopular(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.length >= 2) {
      const searchTerm = value.toLowerCase();
      const filtered = airports
        .filter(airport =>
          airport.searchText.includes(searchTerm) ||
          airport.code.toLowerCase().includes(searchTerm)
        )
        .slice(0, 10);

      setFilteredAirports(filtered);
      setIsOpen(filtered.length > 0);
      setShowPopular(false);
      setSelectedIndex(-1);
    } else if (value.length === 0 && isOpen) {
      const popular = airports.filter(airport =>
        popularDestinations.includes(airport.code)
      );
      setFilteredAirports(popular);
      setShowPopular(true);
      setSelectedIndex(-1);
    } else {
      setFilteredAirports([]);
      setIsOpen(false);
      setShowPopular(false);
    }
  }, [value, isOpen]);

  const handleSelect = (airport: Airport) => {
    const displayText = `${airport.city} (${airport.code})`;
    onChange(displayText, airport);
    setIsOpen(false);
    setShowPopular(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredAirports.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredAirports.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredAirports.length) {
          handleSelect(filteredAirports[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setShowPopular(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    if (value.length === 0) {
      const popular = airports.filter(airport =>
        popularDestinations.includes(airport.code)
      );
      setFilteredAirports(popular);
      setShowPopular(true);
      setIsOpen(true);
    } else if (value.length >= 2) {
      setIsOpen(filteredAirports.length > 0);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 2) return text;

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <span className="font-semibold text-orange-600">
          {text.substring(index, index + query.length)}
        </span>
        {text.substring(index + query.length)}
      </>
    );
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
        <input
          ref={inputRef}
          type="text"
          id={id}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
          aria-autocomplete="list"
          aria-controls={`${id}-listbox`}
          aria-expanded={isOpen}
        />
      </div>

      {isOpen && filteredAirports.length > 0 && (
        <div
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {showPopular && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-gray-200">
              Popular Destinations
            </div>
          )}

          {filteredAirports.map((airport, index) => (
            <div
              key={`${airport.code}-${airport.airport}`}
              role="option"
              aria-selected={selectedIndex === index}
              onClick={() => handleSelect(airport)}
              className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                selectedIndex === index
                  ? 'bg-orange-50 border-l-4 border-orange-500'
                  : 'hover:bg-gray-50 border-l-4 border-transparent'
              }`}
            >
              <Plane className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-gray-900">
                    {showPopular ? (
                      `${airport.city} (${airport.code})`
                    ) : (
                      highlightMatch(`${airport.city} (${airport.code})`, value)
                    )}
                  </span>
                  {!showPopular && (
                    <span className="text-sm text-gray-500 truncate">
                      {airport.airport}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {airport.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && filteredAirports.length === 0 && value.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          No airports found for "{value}"
        </div>
      )}
    </div>
  );
}
