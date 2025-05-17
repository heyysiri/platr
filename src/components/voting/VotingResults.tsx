import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface VoterData {
  name: string;
  avatar: string;
  vote: string;
}

interface RestaurantVoteData {
  id: string;
  name: string;
  votes: number;
  percentage: number;
  image: string;
  voters: VoterData[];
}

// Sample data
const sampleVoteResults: RestaurantVoteData[] = [
  {
    id: '1',
    name: 'The Spice Garden',
    votes: 5,
    percentage: 50,
    image: 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Spice+Garden',
    voters: [
      { name: 'Priya', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=P', vote: '1' },
      { name: 'Rahul', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=R', vote: '1' },
      { name: 'Vikram', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=V', vote: '1' },
      { name: 'Neha', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=N', vote: '1' },
      { name: 'Arjun', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=A', vote: '1' },
    ],
  },
  {
    id: '2',
    name: 'Sushi Express',
    votes: 3,
    percentage: 30,
    image: 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Sushi+Express',
    voters: [
      { name: 'Sanjay', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=S', vote: '2' },
      { name: 'Meera', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=M', vote: '2' },
      { name: 'Anil', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=A', vote: '2' },
    ],
  },
  {
    id: '3',
    name: 'Pizza Palace',
    votes: 2,
    percentage: 20,
    image: 'https://placehold.co/400x300/FF5A00/FFFFFF?text=Pizza+Palace',
    voters: [
      { name: 'Deepa', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=D', vote: '3' },
      { name: 'Karan', avatar: 'https://placehold.co/32/FF5A00/FFFFFF?text=K', vote: '3' },
    ],
  },
];

interface VotingResultsProps {
  onFinalize: (restaurantId: string) => void;
}

export default function VotingResults({ onFinalize }: VotingResultsProps) {
  const [voteResults, setVoteResults] = useState<RestaurantVoteData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setVoteResults(sampleVoteResults);
      setIsLoading(false);
      
      // Auto-select the top voted restaurant
      if (sampleVoteResults.length > 0) {
        setSelectedResult(sampleVoteResults[0].id);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFinalizeChoice = () => {
    if (selectedResult) {
      setConfetti(true);
      setTimeout(() => {
        onFinalize(selectedResult);
      }, 2000);
    }
  };
  
  // Sort results by votes (highest first)
  const sortedResults = [...voteResults].sort((a, b) => b.votes - a.votes);
  
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <div className="animate-spin w-12 h-12 mx-auto mb-6 border-4 border-[#FF5A00] border-t-transparent rounded-full"></div>
        <h2 className="text-2xl font-bold mb-2">Tallying the votes...</h2>
        <p className="text-gray-600 dark:text-gray-400">We&apos;re gathering everyone&apos;s preferences</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {confetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FF5A00', '#FFC107', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)],
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 500,
                opacity: [0, 1, 1, 0],
                x: Math.random() * 200 - 100,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: "easeOut",
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
    
      <div className="bg-white dark:bg-[#222222]/20 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Voting Results</h2>
          
          <div className="space-y-6 mb-8">
            {sortedResults.map((result, index) => (
              <div 
                key={result.id}
                className={`relative bg-gray-50 dark:bg-[#333333]/50 rounded-lg p-4 
                  ${selectedResult === result.id ? 'ring-2 ring-[#FF5A00]' : 'hover:bg-gray-100 dark:hover:bg-[#333333]'}
                  cursor-pointer transition-all duration-300`}
                onClick={() => setSelectedResult(result.id)}
              >
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 bg-[#FF5A00] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    Top Choice
                  </div>
                )}
                
                <div className="flex items-center mb-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                    <Image 
                      src={result.image} 
                      alt={result.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{result.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {result.votes} {result.votes === 1 ? 'vote' : 'votes'} ({result.percentage}%)
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <motion.div 
                    className="h-2.5 rounded-full bg-[#FF5A00]"
                    style={{ width: '0%' }}
                    animate={{ width: `${result.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {result.voters.map((voter, i) => (
                    <div 
                      key={i} 
                      className="flex items-center bg-white dark:bg-[#222222] border border-gray-200 dark:border-gray-700 rounded-full py-1 px-2"
                      title={`${voter.name} voted for ${result.name}`}
                    >
                      <div className="w-5 h-5 rounded-full overflow-hidden mr-1 flex-shrink-0">
                        <Image 
                          src={voter.avatar} 
                          alt={voter.name}
                          width={20}
                          height={20}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-xs">{voter.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Finalize decision */}
          <div className="bg-[#F8F0E5] dark:bg-[#222222]/50 rounded-lg p-6 border border-[#FF5A00]/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-bold mb-1">Ready to finalize your choice?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {selectedResult 
                    ? `You&apos;ve selected ${voteResults.find(r => r.id === selectedResult)?.name}`
                    : 'Select a restaurant from above to finalize'
                  }
                </p>
              </div>
              <button
                onClick={handleFinalizeChoice}
                disabled={!selectedResult}
                className={`px-6 py-3 rounded-lg font-medium 
                  ${selectedResult
                    ? 'bg-[#FF5A00] text-white hover:bg-[#E65100]'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  } transition-colors`}
              >
                Finalize Choice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 