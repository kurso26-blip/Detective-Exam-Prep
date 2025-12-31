
import React, { useState } from 'react';
import { PracticeExam } from '../types';
import ActivityCard from './ActivityCard';

interface ExamViewerProps {
  exam: PracticeExam;
  onBack: () => void;
  onComplete?: (correct: number, total: number) => void;
}

const ExamViewer: React.FC<ExamViewerProps> = ({ exam, onBack, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>(new Array(exam.questions.length).fill(null));

  const handleNext = () => {
    if (currentIdx < exam.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setHasAnswered(userAnswers[currentIdx + 1] !== null);
    } else {
      if (onComplete) onComplete(score, exam.questions.length);
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setHasAnswered(true);
    }
  };

  const onActivityAnswer = (isCorrect: boolean) => {
    if (userAnswers[currentIdx] === null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentIdx] = isCorrect;
      setUserAnswers(newAnswers);
      if (isCorrect) setScore(prev => prev + 1);
      setHasAnswered(true);
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / exam.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${percentage >= 70 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Exam Results</h3>
        <p className="text-gray-500 mb-2 text-lg">{exam.title} Summary</p>
        <div className="text-5xl font-black text-gray-900 mb-8">{percentage}%</div>
        
        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Total Score</span>
            <span className="text-xl font-bold">{score} / {exam.questions.length}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl">
            <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Status</span>
            <span className={`text-xl font-bold ${percentage >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
              {percentage >= 70 ? 'Passed' : 'Review Required'}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={onBack}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition text-lg"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={() => {
              setCurrentIdx(0);
              setScore(0);
              setIsFinished(false);
              setHasAnswered(false);
              setUserAnswers(new Array(exam.questions.length).fill(null));
            }}
            className="w-full bg-white text-blue-600 border border-blue-200 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition text-lg"
          >
            Retake Exam
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          Exit Exam
        </button>
        <div className="flex flex-col items-end">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Question {currentIdx + 1} of {exam.questions.length}</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-300" 
              style={{ width: `${((currentIdx + 1) / exam.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <ActivityCard 
          activity={currentQuestion} 
          onAnswer={onActivityAnswer}
        />

        <div className="flex justify-between items-center">
          <button 
            disabled={currentIdx === 0}
            onClick={handleBack}
            className="px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition flex items-center space-x-2 disabled:opacity-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Previous</span>
          </button>

          <button 
            disabled={!hasAnswered}
            onClick={handleNext}
            className={`px-10 py-4 rounded-2xl font-bold shadow-lg transition flex items-center space-x-2 ${
              hasAnswered 
              ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700' 
              : 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
            }`}
          >
            <span>{currentIdx === exam.questions.length - 1 ? 'Finish Exam' : 'Next Question'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamViewer;
