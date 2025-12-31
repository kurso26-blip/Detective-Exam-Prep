
import React, { useState, useEffect } from 'react';
import { DepartmentOrder, DocumentSection } from '../types';

interface OrderReaderProps {
  order: DepartmentOrder;
}

const OrderReader: React.FC<OrderReaderProps> = ({ order }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(0);
    setZoom(1);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [order]);

  const totalPages = order.contentSections?.length || order.pages.length;
  const nextPage = () => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  const prevPage = () => setCurrentPage(prev => Math.max(0, prev - 1));

  const renderSimulatedPage = (sections: DocumentSection[]) => (
    <div className="bg-white w-[800px] min-h-[1100px] p-16 shadow-inner relative font-serif text-gray-900 overflow-hidden select-text">
      {/* CPD Header */}
      <div className="border-b-4 border-black pb-4 mb-8 text-center">
        <h1 className="text-2xl font-black tracking-tighter uppercase mb-1">Chicago Police Department</h1>
        <div className="flex justify-between items-end text-xs font-bold uppercase">
          <div className="text-left">
            <p>Subject:</p>
            <p className="text-sm font-black">{order.title}</p>
          </div>
          <div className="text-right">
            <p>Directive No: <span className="text-sm font-black">{order.id}</span></p>
            <p>Effective: {order.effectiveDate}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            <h3 className="text-sm font-black uppercase mb-3 underline decoration-2 underline-offset-4">
              {section.header}
            </h3>
            <div className="space-y-4 pl-4 border-l border-gray-100">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[15px] leading-relaxed text-justify">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[120px] font-black whitespace-nowrap uppercase">Official Copy</h2>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-16 right-16 border-t border-gray-300 pt-4 flex justify-between text-[10px] font-bold text-gray-400 uppercase">
        <span>Page {currentPage + 1} of {totalPages}</span>
        <span>{order.id} Reference</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700 text-white z-20">
        <div className="flex flex-col">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">{order.category}</span>
            <h2 className="text-sm font-bold truncate max-w-xs">{order.title}</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-0.5">{order.id} • {order.effectiveDate}</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-700">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1.5 hover:bg-slate-700 rounded transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
            </button>
            <span className="text-xs font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-1.5 hover:bg-slate-700 rounded transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button disabled={currentPage === 0} onClick={prevPage} className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded-lg transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div className="flex items-center space-x-1 text-sm font-bold min-w-[50px] justify-center">
              <span className="text-blue-400">{currentPage + 1}</span>
              <span className="text-slate-500">/</span>
              <span>{totalPages}</span>
            </div>
            <button disabled={currentPage === totalPages - 1} onClick={nextPage} className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded-lg transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewing Area */}
      <div className="flex-1 overflow-auto bg-slate-950 flex justify-center p-8 custom-scrollbar relative">
        <div 
          className="relative transition-transform duration-200 origin-top shadow-2xl"
          style={{ transform: `scale(${zoom})` }}
        >
          {isLoading ? (
            <div className="w-[800px] h-[1100px] bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Rendering Digital Scan...</p>
              </div>
            </div>
          ) : (
            <>
              {order.contentSections ? (
                renderSimulatedPage(order.contentSections[currentPage])
              ) : (
                <div className="bg-white p-1 rounded shadow-inner">
                  <img 
                    src={order.pages[currentPage]} 
                    alt={`${order.id} Page ${currentPage + 1}`}
                    className="block max-w-full h-auto border border-gray-200"
                    style={{ width: '800px', height: 'auto', minHeight: '1100px' }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderReader;
