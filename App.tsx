
import React, { useState, useMemo, useEffect } from 'react';
import { Unit, Lesson, DepartmentOrder, PracticeExam } from './types';
import { curriculum } from './data/curriculum';
import { departmentOrders } from './data/orders';
import { practiceExams } from './data/exams';
import OrderReader from './components/OrderReader';
import LessonViewer from './components/LessonViewer';
import Dashboard from './components/Dashboard';
import FlashcardDeck from './components/FlashcardDeck';
import UnitQuiz from './components/UnitQuiz';
import ExamViewer from './components/ExamViewer';

enum View {
  DASHBOARD = 'dashboard',
  LESSON = 'lesson',
  ORDER = 'order',
  UNIT_FLASHCARDS = 'unit_flashcards',
  UNIT_QUIZ = 'unit_quiz',
  PRACTICE_EXAM = 'practice_exam'
}

interface ScoreRecord {
  correct: number;
  total: number;
}

const STORAGE_KEY = 'cpd_exam_scores';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeOrder, setActiveOrder] = useState<DepartmentOrder | null>(null);
  const [activeExam, setActiveExam] = useState<PracticeExam | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Initialize scores from localStorage
  const [scores, setScores] = useState<ScoreRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save scores whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  const avgAccuracy = useMemo(() => {
    if (scores.length === 0) return 0;
    const totalCorrect = scores.reduce((acc, s) => acc + s.correct, 0);
    const totalQuestions = scores.reduce((acc, s) => acc + s.total, 0);
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  }, [scores]);

  const recordScore = (correct: number, total: number) => {
    if (total > 0) {
      setScores(prev => [...prev, { correct, total }]);
    }
  };

  const navigateToLesson = (unit: Unit, lesson: Lesson) => {
    setActiveUnit(unit);
    setActiveLesson(lesson);
    setCurrentView(View.LESSON);
  };

  const navigateToOrder = (orderId: string) => {
    const order = departmentOrders.find(o => o.id === orderId) || departmentOrders[0];
    setActiveOrder(order);
    setCurrentView(View.ORDER);
    setIsSidebarOpen(false);
  };

  const navigateToUnitFlashcards = (unit: Unit) => {
    setActiveUnit(unit);
    setCurrentView(View.UNIT_FLASHCARDS);
  };

  const navigateToUnitQuiz = (unit: Unit) => {
    setActiveUnit(unit);
    setCurrentView(View.UNIT_QUIZ);
  };

  const navigateToPracticeExam = (exam: PracticeExam) => {
    setActiveExam(exam);
    setCurrentView(View.PRACTICE_EXAM);
  };

  const categories = ['General', 'Special', 'Notice', 'Resource', 'Training', 'Statute'] as const;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl italic">CPD</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Detective Prep</h1>
              <p className="text-xs text-slate-400">Class of 2026</p>
            </div>
          </div>

          <nav className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <button 
              onClick={() => { setCurrentView(View.DASHBOARD); setIsSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${currentView === View.DASHBOARD ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              <span>Dashboard</span>
            </button>

            {categories.map(cat => (
              <div key={cat} className="space-y-1">
                <h2 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{cat}s</h2>
                {departmentOrders.filter(o => o.category === cat).map(order => (
                  <button
                    key={order.id}
                    onClick={() => navigateToOrder(order.id)}
                    className={`w-full text-left px-4 py-1.5 rounded-lg text-xs transition ${activeOrder?.id === order.id && currentView === View.ORDER ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <span className="font-mono text-[10px] opacity-70 block">{order.id}</span>
                    <span className="truncate block">{order.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Exam Readiness</span>
              <h2 className="text-xl font-bold text-gray-900 truncate">
                {currentView === View.DASHBOARD && "Study Dashboard"}
                {currentView === View.LESSON && `Unit ${activeUnit?.id}: ${activeLesson?.title}`}
                {currentView === View.ORDER && `Direct Reference`}
                {currentView === View.UNIT_FLASHCARDS && `Unit ${activeUnit?.id} Flashcards`}
                {currentView === View.UNIT_QUIZ && `Unit ${activeUnit?.id} Proficiency Quiz`}
                {currentView === View.PRACTICE_EXAM && activeExam?.title}
              </h2>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50">
          {currentView === View.DASHBOARD && (
            <Dashboard 
              curriculum={curriculum} 
              practiceExams={practiceExams}
              onSelectLesson={navigateToLesson}
              onSelectUnitFlashcards={navigateToUnitFlashcards}
              onSelectUnitQuiz={navigateToUnitQuiz}
              onSelectPracticeExam={navigateToPracticeExam}
              avgAccuracy={avgAccuracy}
            />
          )}

          {currentView === View.LESSON && activeLesson && (
            <LessonViewer 
              unit={activeUnit!} 
              lesson={activeLesson} 
              onBack={() => setCurrentView(View.DASHBOARD)}
              onNextOrder={(id) => navigateToOrder(id)}
            />
          )}

          {currentView === View.ORDER && activeOrder && (
            <OrderReader order={activeOrder} />
          )}

          {currentView === View.UNIT_FLASHCARDS && activeUnit && (
            <FlashcardDeck 
              title={activeUnit.title}
              flashcards={activeUnit.flashcards}
              onBack={() => setCurrentView(View.DASHBOARD)}
            />
          )}

          {currentView === View.UNIT_QUIZ && activeUnit && (
            <UnitQuiz 
              unit={activeUnit}
              onBack={() => setCurrentView(View.DASHBOARD)}
              onComplete={recordScore}
            />
          )}

          {currentView === View.PRACTICE_EXAM && activeExam && (
            <ExamViewer 
              exam={activeExam}
              onBack={() => setCurrentView(View.DASHBOARD)}
              onComplete={recordScore}
            />
          )}
        </div>
      </main>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;
