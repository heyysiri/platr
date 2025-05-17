import { useState } from 'react';
import Image from 'next/image';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string[];
    price: string;
    rating: number;
    image: string;
    distance: string;
    address: string;
    crowdLevel: 'low' | 'medium' | 'high';
    crowdData: number[];
    dietaryOptions: string[];
    openNow: boolean;
  };
  onVote: (id: string) => void;
  selected?: boolean;
}

export default function RestaurantCard({ restaurant, onVote, selected = false }: RestaurantCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };
  
  const getCrowdLevelText = (level: string) => {
    switch (level) {
      case 'low': return 'Not busy';
      case 'medium': return 'Moderately busy';
      case 'high': return 'Very busy';
      default: return 'Unknown';
    }
  };
  
  // Convert price string to dollar signs
  const priceSymbol = Array(restaurant.price === 'budget' ? 1 : restaurant.price === 'moderate' ? 2 : 3).fill('$').join('');
  
  return (
    <div 
      className={`bg-white dark:bg-[#222222]/20 rounded-xl shadow-lg overflow-hidden 
        border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        ${selected ? 'border-[#FF5A00]' : 'border-transparent'}`}
    >
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image 
            src={restaurant.image || 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Restaurant'} 
            alt={restaurant.name}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
          {restaurant.openNow && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
              Open Now
            </div>
          )}
          <div className="absolute top-3 right-3 flex space-x-1">
            {restaurant.dietaryOptions.map((option, index) => (
              <div 
                key={index} 
                className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
                title={option}
              >
                {option === 'Vegetarian' && <span className="text-green-500">🥗</span>}
                {option === 'Vegan' && <span className="text-green-600">🌱</span>}
                {option === 'Gluten-Free' && <span className="text-amber-600">🌾</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{restaurant.name}</h3>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="font-medium text-sm">{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {restaurant.cuisine.map((type, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {type}
            </span>
          ))}
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            {priceSymbol}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400">{restaurant.distance} away</span>
          </div>
          
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full ${getCrowdLevelColor(restaurant.crowdLevel)} mr-1`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{getCrowdLevelText(restaurant.crowdLevel)}</span>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-2">Crowd throughout the day</h4>
              <div className="flex h-24 items-end space-x-1">
                {restaurant.crowdData.map((level, i) => (
                  <div 
                    key={i}
                    className="flex-1"
                    title={`${Math.round(level * 100)}% full at ${i + 9}:00`}
                  >
                    <div 
                      className="bg-[#FF5A00]/80 rounded-t"
                      style={{ height: `${level * 100}%` }}
                    ></div>
                    <div className="text-xs text-center mt-1">{i + 9}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              <p>{restaurant.address}</p>
            </div>
            
            <div className="flex justify-between text-sm">
              <button className="text-[#FF5A00]">
                View on map
              </button>
              <button className="text-[#FF5A00]">
                View details
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
          >
            {expanded ? 'Show less' : 'Show more'}
            <svg 
              className={`w-4 h-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <button
            onClick={() => onVote(restaurant.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium
              ${selected 
                ? 'bg-[#FF5A00] text-white'
                : 'bg-[#FF5A00]/10 text-[#FF5A00] hover:bg-[#FF5A00]/20'
              } transition-colors`}
          >
            {selected ? 'Selected' : 'Vote'}
          </button>
        </div>
      </div>
    </div>
  );
} 