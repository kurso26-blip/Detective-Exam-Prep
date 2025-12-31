
import React, { useState } from 'react';
import { Activity } from '../types';
import ActivityCard from './ActivityCard';

interface FlashcardDeckProps {
  title: string;
  flashcards: Activity[];
  onBack: () => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ title, flashcards, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (flashcards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h3 className="text-xl font-bold text-gray-900">No flashcards available for this unit yet.</h3>
        <button onClick={onBack} className="mt-4 text-blue-600 font-bold">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Curriculum
        </button>
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{title} Deck</span>
      </div>

      <div className="flex flex-col items-center space-y-10">
        <div className="w-full">
          <ActivityCard 
            activity={flashcards[currentIdx]} 
            onAnswer={() => {}} 
          />
        </div>

        <div className="w-full flex items-center justify-between px-4">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 disabled:opacity-0 transition font-bold"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Previous</span>
          </button>
          
          <div className="flex flex-col items-center">
             <span className="text-sm font-bold text-gray-900">{currentIdx + 1} / {flashcards.length}</span>
             <div className="flex space-x-1 mt-2">
              {flashcards.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIdx ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              ))}
            </div>
          </div>

          <button 
            disabled={currentIdx === flashcards.length - 1}
            onClick={() => setCurrentIdx(currentIdx + 1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-900 disabled:opacity-0 transition font-bold"
          >
            <span>Next</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      
      {currentIdx === flashcards.length - 1 && (
        <div className="text-center pt-4">
          <p className="text-gray-500 mb-4">You've reached the end of the deck!</p>
          <button 
            onClick={onBack}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
          >
            Complete Review
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardDeck;
