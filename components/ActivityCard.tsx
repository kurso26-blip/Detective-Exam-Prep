
import React, { useState, useEffect } from 'react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onAnswer?: (isCorrect: boolean) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when activity changes
  useEffect(() => {
    setIsFlipped(false);
    setSelectedOption(null);
    setShowFeedback(false);
  }, [activity]);

  if (activity.type === 'flashcard') {
    return (
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-80 w-full cursor-pointer perspective-1000"
      >
        <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 bg-white border-2 border-blue-500 rounded-3xl p-10 flex flex-col items-center justify-center text-center backface-hidden shadow-xl">
            <span className="absolute top-4 left-6 text-xs font-black text-blue-500 uppercase tracking-widest">Flashcard</span>
            <h3 className="text-2xl font-bold text-gray-900">{activity.question}</h3>
            <p className="mt-8 text-sm text-gray-400 animate-pulse font-medium">Click to see answer</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-blue-600 text-white rounded-3xl p-10 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 shadow-xl">
            <span className="absolute top-4 left-6 text-xs font-black text-blue-200 uppercase tracking-widest">Answer</span>
            <p className="text-2xl font-medium whitespace-pre-wrap leading-relaxed">{activity.answer}</p>
          </div>
        </div>
      </div>
    );
  }

  const isScenario = activity.type === 'scenario';

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${isScenario ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
          {isScenario ? 'Practical Scenario' : 'Multiple Choice'}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-snug">
        {activity.question}
      </h3>

      <div className="space-y-3">
        {activity.options?.map((option, idx) => (
          <button
            key={idx}
            disabled={showFeedback}
            onClick={() => {
              const isCorrect = option === activity.correctAnswer;
              setSelectedOption(option);
              setShowFeedback(true);
              if (onAnswer) onAnswer(isCorrect);
            }}
            className={`w-full text-left p-5 rounded-2xl border-2 transition flex items-center justify-between font-medium text-lg ${
              showFeedback
                ? option === activity.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : selectedOption === option
                  ? 'border-red-500 bg-red-50 text-red-800'
                  : 'border-gray-100 text-gray-400 opacity-50'
                : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
            }`}
          >
            <span>{option}</span>
            {showFeedback && option === activity.correctAnswer && (
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            )}
            {showFeedback && selectedOption === option && option !== activity.correctAnswer && (
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
            )}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl animate-fade-in">
          <h4 className="font-black text-blue-900 uppercase text-xs tracking-widest mb-2">Detailed Feedback</h4>
          <p className="text-blue-800 text-lg leading-relaxed">{activity.explanation}</p>
        </div>
      )}
    </div>
  );
};

// Injection of CSS for card flip
const StyleHeader = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
  `}} />
);

export default (props: ActivityCardProps) => (
  <>
    <StyleHeader />
    <ActivityCard {...props} />
  </>
);
