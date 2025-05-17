'use client';

import { useState } from 'react';

interface Preferences {
  cuisine: string[];
  dietary: string[];
  budget: string;
  location: string;
}

export default function PreferencesForm() {
  const [preferences, setPreferences] = useState<Preferences>({
    cuisine: [],
    dietary: [],
    budget: '',
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically send the preferences to your backend
      console.log('Submitting preferences:', preferences);
      // You can add API call here to save preferences
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Cuisine Preferences
        </label>
        <select
          multiple
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          value={preferences.cuisine}
          onChange={(e) => setPreferences({
            ...preferences,
            cuisine: Array.from(e.target.selectedOptions, option => option.value)
          })}
        >
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="japanese">Japanese</option>
          <option value="mexican">Mexican</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Dietary Restrictions
        </label>
        <select
          multiple
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          value={preferences.dietary}
          onChange={(e) => setPreferences({
            ...preferences,
            dietary: Array.from(e.target.selectedOptions, option => option.value)
          })}
        >
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten Free</option>
          <option value="dairy-free">Dairy Free</option>
          <option value="halal">Halal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Budget Range
        </label>
        <select
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          value={preferences.budget}
          onChange={(e) => setPreferences({
            ...preferences,
            budget: e.target.value
          })}
        >
          <option value="">Select Budget Range</option>
          <option value="$">$ (Under ₹500)</option>
          <option value="$$">$$ (₹500-1000)</option>
          <option value="$$$">$$$ (₹1000-2000)</option>
          <option value="$$$$">$$$$ (₹2000+)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Preferred Location
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          value={preferences.location}
          onChange={(e) => setPreferences({
            ...preferences,
            location: e.target.value
          })}
          placeholder="Enter preferred location"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#FF5A00] text-white py-2 px-4 rounded-md hover:bg-[#E65100] transition-colors"
      >
        Save Preferences
      </button>
    </form>
  );
} 