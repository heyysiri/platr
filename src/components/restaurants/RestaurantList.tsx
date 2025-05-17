import { useState } from 'react';
import RestaurantCard from './RestaurantCard';

// Sample restaurant data (in a real app, this would come from an API)
const restaurantData = [
  {
    id: '1',
    name: 'The Spice Garden',
    cuisine: ['Indian', 'Vegetarian'],
    price: 'moderate',
    rating: 4.5,
    image: 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Spice+Garden',
    distance: '1.2 km',
    address: '456 Food Street, Mumbai, India',
    crowdLevel: 'medium' as const,
    crowdData: [0.2, 0.3, 0.7, 0.9, 0.8, 0.6, 0.5, 0.8, 0.9, 0.6, 0.3, 0.1],
    dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    openNow: true,
  },
  {
    id: '2',
    name: 'Sushi Express',
    cuisine: ['Japanese', 'Asian'],
    price: 'high-end',
    rating: 4.7,
    image: 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Sushi+Express',
    distance: '2.5 km',
    address: '789 Ocean Drive, Mumbai, India',
    crowdLevel: 'high' as const,
    crowdData: [0.1, 0.2, 0.3, 0.5, 0.8, 0.9, 0.7, 0.6, 0.8, 0.9, 0.5, 0.2],
    dietaryOptions: ['Gluten-Free'],
    openNow: true,
  },
  {
    id: '3',
    name: 'Pizza Palace',
    cuisine: ['Italian', 'American'],
    price: 'budget',
    rating: 4.2,
    image: 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Pizza+Palace',
    distance: '0.8 km',
    address: '123 Main Street, Mumbai, India',
    crowdLevel: 'low' as const,
    crowdData: [0.1, 0.1, 0.2, 0.4, 0.5, 0.6, 0.4, 0.2, 0.6, 0.7, 0.4, 0.2],
    dietaryOptions: ['Vegetarian'],
    openNow: false,
  },
  {
    id: '4',
    name: 'Green Leaf Cafe',
    cuisine: ['Healthy', 'Cafe'],
    price: 'moderate',
    rating: 4.4,
    image: 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Green+Leaf',
    distance: '1.5 km',
    address: '234 Park Avenue, Mumbai, India',
    crowdLevel: 'medium' as const,
    crowdData: [0.3, 0.5, 0.7, 0.6, 0.4, 0.3, 0.5, 0.6, 0.7, 0.5, 0.3, 0.2],
    dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    openNow: true,
  },
];

interface RestaurantListProps {
  onSelectRestaurant: (id: string) => void;
  selectedRestaurantId?: string;
}

export default function RestaurantList({ onSelectRestaurant, selectedRestaurantId }: RestaurantListProps) {
  const [sortBy, setSortBy] = useState('match');
  const [filterOpen, setFilterOpen] = useState(true);
  const [filters, setFilters] = useState({
    openNow: false,
    dietaryOptions: [] as string[],
    priceRange: [] as string[],
    crowdLevel: [] as string[],
  });
  
  // Filter restaurants based on selected filters
  const filteredRestaurants = restaurantData.filter(restaurant => {
    // Open now filter
    if (filters.openNow && !restaurant.openNow) return false;
    
    // Dietary options filter
    if (filters.dietaryOptions.length > 0 && 
        !filters.dietaryOptions.some(option => restaurant.dietaryOptions.includes(option))) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange.length > 0 && 
        !filters.priceRange.includes(restaurant.price)) {
      return false;
    }
    
    // Crowd level filter
    if (filters.crowdLevel.length > 0 && 
        !filters.crowdLevel.includes(restaurant.crowdLevel)) {
      return false;
    }
    
    return true;
  });
  
  // Sort restaurants based on selected sort option
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'price-low':
        return (a.price === 'budget' ? 1 : a.price === 'moderate' ? 2 : 3) - 
               (b.price === 'budget' ? 1 : b.price === 'moderate' ? 2 : 3);
      case 'price-high':
        return (b.price === 'budget' ? 1 : b.price === 'moderate' ? 2 : 3) - 
               (a.price === 'budget' ? 1 : a.price === 'moderate' ? 2 : 3);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default: // 'match' - In a real app this would use a more complex algorithm
        return b.rating - a.rating; // Default to rating for demo
    }
  });
  
  const toggleDietaryFilter = (option: string) => {
    setFilters(prev => {
      if (prev.dietaryOptions.includes(option)) {
        return { ...prev, dietaryOptions: prev.dietaryOptions.filter(o => o !== option) };
      } else {
        return { ...prev, dietaryOptions: [...prev.dietaryOptions, option] };
      }
    });
  };
  
  const togglePriceFilter = (price: string) => {
    setFilters(prev => {
      if (prev.priceRange.includes(price)) {
        return { ...prev, priceRange: prev.priceRange.filter(p => p !== price) };
      } else {
        return { ...prev, priceRange: [...prev.priceRange, price] };
      }
    });
  };
  
  const toggleCrowdFilter = (level: string) => {
    setFilters(prev => {
      if (prev.crowdLevel.includes(level)) {
        return { ...prev, crowdLevel: prev.crowdLevel.filter(l => l !== level) };
      } else {
        return { ...prev, crowdLevel: [...prev.crowdLevel, level] };
      }
    });
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 bg-white dark:bg-[#222222]/20 rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-bold mb-2 md:mb-0">
            Restaurants Matching Your Group&apos;s Preferences
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 dark:bg-[#333333] border border-gray-200 dark:border-gray-700 rounded-lg py-2 pl-3 pr-10 text-sm focus:ring-2 focus:ring-[#FF5A00] focus:border-[#FF5A00]"
              >
                <option value="match">Best Match</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#333333] rounded-lg border border-gray-200 dark:border-gray-700 text-sm"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters {Object.values(filters).flat().length > 0 && `(${Object.values(filters).flat().length})`}
            </button>
          </div>
        </div>
        
        {filterOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Open</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.openNow}
                  onChange={() => setFilters(prev => ({ ...prev, openNow: !prev.openNow }))}
                  className="rounded border-gray-300 text-[#FF5A00] focus:ring-[#FF5A00]"
                />
                <span className="ml-2 text-sm">Open now</span>
              </label>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Dietary Options</h3>
              <div className="space-y-1">
                {['Vegetarian', 'Vegan', 'Gluten-Free'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.dietaryOptions.includes(option)}
                      onChange={() => toggleDietaryFilter(option)}
                      className="rounded border-gray-300 text-[#FF5A00] focus:ring-[#FF5A00]"
                    />
                    <span className="ml-2 text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <div className="space-y-1">
                {[
                  { value: 'budget', label: '$ Economy' },
                  { value: 'moderate', label: '$$ Moderate' },
                  { value: 'high-end', label: '$$$ High-end' }
                ].map((price) => (
                  <label key={price.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.priceRange.includes(price.value)}
                      onChange={() => togglePriceFilter(price.value)}
                      className="rounded border-gray-300 text-[#FF5A00] focus:ring-[#FF5A00]"
                    />
                    <span className="ml-2 text-sm">{price.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Crowd Level</h3>
              <div className="space-y-1">
                {[
                  { value: 'low', label: 'Not busy', color: 'bg-green-500' },
                  { value: 'medium', label: 'Moderately busy', color: 'bg-yellow-500' },
                  { value: 'high', label: 'Very busy', color: 'bg-red-500' }
                ].map((level) => (
                  <label key={level.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.crowdLevel.includes(level.value)}
                      onChange={() => toggleCrowdFilter(level.value)}
                      className="rounded border-gray-300 text-[#FF5A00] focus:ring-[#FF5A00]"
                    />
                    <div className="ml-2 flex items-center">
                      <div className={`h-2 w-2 rounded-full ${level.color} mr-1`}></div>
                      <span className="text-sm">{level.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {sortedRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onVote={onSelectRestaurant}
              selected={selectedRestaurantId === restaurant.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-[#222222]/20 rounded-xl shadow-md">
          <svg className="w-12 h-12 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-lg font-medium">No restaurants match your filters</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your filters to see more results.</p>
          <button
            onClick={() => setFilters({ openNow: false, dietaryOptions: [], priceRange: [], crowdLevel: [] })}
            className="mt-4 px-4 py-2 bg-[#FF5A00] text-white rounded-lg text-sm hover:bg-[#E65100] transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
} 