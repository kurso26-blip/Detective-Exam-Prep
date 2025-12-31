
import React from 'react';
import { Unit, Lesson, PracticeExam } from '../types';

interface DashboardProps {
  curriculum: Unit[];
  practiceExams: PracticeExam[];
  onSelectLesson: (unit: Unit, lesson: Lesson) => void;
  onSelectUnitFlashcards: (unit: Unit) => void;
  onSelectUnitQuiz: (unit: Unit) => void;
  onSelectPracticeExam: (exam: PracticeExam) => void;
  avgAccuracy: number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  curriculum, 
  practiceExams,
  onSelectLesson, 
  onSelectUnitFlashcards, 
  onSelectUnitQuiz,
  onSelectPracticeExam,
  avgAccuracy
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-2">Welcome, Future Detective.</h3>
          <p className="text-blue-100 text-lg opacity-90 max-w-xl mb-6">
            Master the Chicago Police Department Promotional Written Job-Knowledge Examination. Follow the curriculum to build recall and tactical skills.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-4">
              <span className="block text-2xl font-bold">124</span>
              <span className="text-xs text-blue-200 uppercase font-semibold">Orders Tracked</span>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-4">
              <span className="block text-2xl font-bold">{curriculum.length}</span>
              <span className="text-xs text-blue-200 uppercase font-semibold">Core Units</span>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-4">
              <span className="block text-2xl font-bold">{curriculum.reduce((acc, unit) => acc + unit.lessons.length, 0)}</span>
              <span className="text-xs text-blue-200 uppercase font-semibold">Active Lessons</span>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-4">
              <span className="block text-2xl font-bold">{avgAccuracy}%</span>
              <span className="text-xs text-blue-200 uppercase font-semibold">Avg. Accuracy</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
      </section>

      <div className="space-y-8">
        <h4 className="text-2xl font-bold text-gray-800 px-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          Study Path
        </h4>

        {curriculum.map(unit => (
          <div key={unit.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {unit.id}
                </span>
                <h5 className="text-lg font-bold text-gray-900">{unit.title}</h5>
              </div>
              <div className="flex items-center space-x-2">
                 <button 
                  onClick={() => onSelectUnitFlashcards(unit)}
                  className="bg-white text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-50 transition flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  <span>Flashcards</span>
                </button>
                <button 
                  onClick={() => onSelectUnitQuiz(unit)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span>Unit Quiz</span>
                </button>
                <span className="text-xs font-bold text-gray-400 bg-gray-200 px-2 py-1.5 rounded-lg">
                  {unit.lessons.length} LESSONS
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {unit.lessons.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(unit, lesson)}
                  className="w-full text-left px-6 py-4 hover:bg-blue-50 transition group flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-tighter">Lesson {unit.id}.{lesson.id}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{lesson.orderRef}</span>
                    </div>
                    <span className="text-lg font-medium text-gray-900 group-hover:text-blue-700">{lesson.title}</span>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{lesson.summary}</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8 pb-12">
        <h4 className="text-2xl font-bold text-gray-800 px-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          Full-Length Practice Exams
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {practiceExams.map(exam => (
            <button
              key={exam.id}
              onClick={() => onSelectPracticeExam(exam)}
              className="bg-white border border-gray-200 rounded-3xl p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-8 -mt-8 group-hover:bg-orange-100 transition"></div>
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest mb-2 block relative">Simulation {exam.id}</span>
              <h5 className="text-xl font-bold text-gray-900 mb-4 relative">{exam.title}</h5>
              <div className="flex items-center space-x-4 text-sm text-gray-500 relative">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  50 MCQ
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Scenario
                </span>
              </div>
              <div className="mt-6 w-full py-2 bg-orange-600 text-white rounded-xl text-center font-bold group-hover:bg-orange-700 transition relative">
                Take Exam
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
