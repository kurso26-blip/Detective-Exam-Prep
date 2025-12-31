
import React, { useState } from 'react';
import { Unit, Lesson, Activity } from '../types';
import ActivityCard from './ActivityCard';

interface LessonViewerProps {
  unit: Unit;
  lesson: Lesson;
  onBack: () => void;
  onNextOrder: (id: string) => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ unit, lesson, onBack, onNextOrder }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'activities'>('content');
  const [currentActivityIdx, setCurrentActivityIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={onBack}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Units
        </button>
        <div className="flex space-x-1 p-1 bg-gray-200 rounded-xl">
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${activeTab === 'content' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Lesson
          </button>
          <button 
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${activeTab === 'activities' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Practice
          </button>
        </div>
      </div>

      {activeTab === 'content' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black">UNIT {unit.id} • LESSON {lesson.id}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
            <div className="prose prose-blue max-w-none text-gray-700 text-lg leading-relaxed">
              <p className="mb-6 font-medium text-gray-900">{lesson.summary}</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl mb-8">
                <h4 className="text-blue-900 font-bold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  Primary Order Reference
                </h4>
                <p className="text-blue-800 mb-4">This lesson is based on Department directive {lesson.orderRef}. Reviewing the source text is essential for recall questions.</p>
                <button 
                  onClick={() => onNextOrder(lesson.orderRef)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                >
                  Read Full Order {lesson.orderRef}
                </button>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-xl">Key Concepts to Master:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start space-x-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-green-500">✔</span>
                    <span>Detailed procedural requirements and timelines.</span>
                  </li>
                  <li className="flex items-start space-x-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-green-500">✔</span>
                    <span>Definitions of specific legal and tactical terms.</span>
                  </li>
                  <li className="flex items-start space-x-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-green-500">✔</span>
                    <span>Exceptions to general protocols.</span>
                  </li>
                  <li className="flex items-start space-x-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-green-500">✔</span>
                    <span>Supervisor notification requirements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('activities')}
            className="w-full bg-blue-600 text-white py-4 rounded-3xl font-bold text-xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 flex items-center justify-center space-x-3"
          >
            <span>Start Practice Activities</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-gray-500">Activity {currentActivityIdx + 1} of {lesson.activities.length}</span>
            <div className="flex space-x-1">
              {lesson.activities.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === currentActivityIdx ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              ))}
            </div>
          </div>
          
          <ActivityCard 
            activity={lesson.activities[currentActivityIdx]} 
            onAnswer={() => {}} 
          />

          <div className="flex justify-between items-center px-4">
            <button 
              disabled={currentActivityIdx === 0}
              onClick={() => setCurrentActivityIdx(currentActivityIdx - 1)}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-0 transition flex items-center font-bold"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              Previous
            </button>
            <button 
              onClick={() => {
                if (currentActivityIdx < lesson.activities.length - 1) {
                  setCurrentActivityIdx(currentActivityIdx + 1);
                } else {
                  onBack();
                }
              }}
              className="text-blue-600 hover:text-blue-800 transition flex items-center font-bold"
            >
              {currentActivityIdx === lesson.activities.length - 1 ? 'Finish Lesson' : 'Next Activity'}
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer;
