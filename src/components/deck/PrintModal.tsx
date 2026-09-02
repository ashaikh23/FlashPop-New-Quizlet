import React, { useState } from 'react';
import { Printer, FileText, CheckSquare, Grid, X } from 'lucide-react';
import { Deck } from '../../types';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck;
}

export const PrintModal: React.FC<PrintModalProps> = ({ isOpen, onClose, deck }) => {
  const [printLayout, setPrintLayout] = useState<'table' | 'quiz' | 'cards'>('table');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:m-0 print:overflow-visible">
      {/* Backdrop (hidden on print) */}
      <div
        className="fixed inset-0 bg-dark/70 backdrop-blur-sm transition-opacity print:hidden"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border-2 border-dark shadow-pop-lg z-10 my-8 animate-bounce-in print:border-none print:shadow-none print:p-0 print:my-0 print:w-full print:max-w-none">
        {/* Header - Screen only */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-dark/10 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-tertiary border-2 border-dark flex items-center justify-center shadow-pop-active">
              <Printer size={18} strokeWidth={2.5} className="text-dark" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-black text-dark">
                Print Study Materials
              </h2>
              <p className="text-xs font-medium text-dark/60">
                {deck.title} • {deck.cards.length} cards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream border-2 border-dark text-dark hover:bg-rose-100 flex items-center justify-center shadow-pop-active transition-all"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Layout Selector - Screen only */}
        <div className="py-4 border-b-2 border-dark/10 space-y-2 print:hidden">
          <span className="text-xs font-heading font-black uppercase tracking-wider text-dark/60 block">
            Choose Print Format:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setPrintLayout('table')}
              className={`p-3 rounded-2xl border-2 border-dark text-left transition-all ${
                printLayout === 'table'
                  ? 'bg-accent text-white shadow-pop'
                  : 'bg-cream text-dark hover:bg-white shadow-pop-active'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText size={16} strokeWidth={2.5} />
                <span className="font-heading font-black text-xs">Vocabulary Table</span>
              </div>
              <p className="text-[10px] opacity-80 leading-snug">
                Two-column review sheet with terms, clues & definitions.
              </p>
            </button>

            <button
              onClick={() => setPrintLayout('quiz')}
              className={`p-3 rounded-2xl border-2 border-dark text-left transition-all ${
                printLayout === 'quiz'
                  ? 'bg-secondary text-white shadow-pop'
                  : 'bg-cream text-dark hover:bg-white shadow-pop-active'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckSquare size={16} strokeWidth={2.5} />
                <span className="font-heading font-black text-xs">Practice Exam</span>
              </div>
              <p className="text-[10px] opacity-80 leading-snug">
                Fill-in-the-blank test sheet with detachable answer key.
              </p>
            </button>

            <button
              onClick={() => setPrintLayout('cards')}
              className={`p-3 rounded-2xl border-2 border-dark text-left transition-all ${
                printLayout === 'cards'
                  ? 'bg-tertiary text-dark shadow-pop'
                  : 'bg-cream text-dark hover:bg-white shadow-pop-active'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Grid size={16} strokeWidth={2.5} />
                <span className="font-heading font-black text-xs">Cutout Cards</span>
              </div>
              <p className="text-[10px] opacity-80 leading-snug">
                Dashed grid layout for scissors cutting into physical flashcards.
              </p>
            </button>
          </div>
        </div>

        {/* Printable Document Preview */}
        <div className="max-h-[50vh] overflow-y-auto p-4 my-4 bg-[#FFFDF5] rounded-2xl border-2 border-dark/10 print:max-h-none print:overflow-visible print:p-0 print:border-none print:bg-white print:m-0">
          <div className="text-center mb-6 pb-4 border-b-2 border-dark">
            <h1 className="text-2xl font-heading font-black text-dark tracking-tight">
              {deck.title}
            </h1>
            <p className="text-xs text-dark/70 mt-1 max-w-lg mx-auto">
              {deck.description || 'FlashPop Study Guide'}
            </p>
            <div className="text-[10px] font-mono text-dark/50 mt-2">
              Generated with FlashPop • {deck.cards.length} terms • Author: Afya
            </div>
          </div>

          {/* 1. Vocabulary Table Layout */}
          {printLayout === 'table' && (
            <table className="w-full text-left border-collapse border-2 border-dark text-xs">
              <thead>
                <tr className="bg-muted border-b-2 border-dark">
                  <th className="p-2.5 border-r-2 border-dark font-heading font-black w-1/3">Term</th>
                  <th className="p-2.5 font-heading font-black">Definition & Notes</th>
                </tr>
              </thead>
              <tbody>
                {deck.cards.map((c, i) => (
                  <tr key={c.id} className="border-b border-dark/30 hover:bg-cream">
                    <td className="p-2.5 border-r-2 border-dark font-heading font-bold align-top">
                      <span className="text-[10px] text-dark/50 mr-1.5 font-mono">{i + 1}.</span>
                      {c.term}
                      {c.hint && (
                        <span className="block text-[10px] text-accent mt-1 italic font-normal">
                          💡 {c.hint}
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 align-top space-y-1">
                      <p className="text-dark leading-relaxed">{c.definition}</p>
                      {c.example && (
                        <p className="text-[10px] text-dark/70 bg-muted/60 p-1.5 rounded">
                          <strong>Ex:</strong> {c.example}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 2. Practice Exam Layout */}
          {printLayout === 'quiz' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {deck.cards.map((c, i) => (
                  <div key={c.id} className="p-3 bg-white rounded-xl border border-dark/20 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="font-heading font-black text-sm">{i + 1}.</span>
                      <div className="flex-1 space-y-2">
                        <p className="font-medium text-dark leading-relaxed">{c.definition}</p>
                        {c.hint && (
                          <span className="text-[10px] text-dark/60 block italic">
                            Clue: {c.hint}
                          </span>
                        )}
                        <div className="pt-2 flex items-center gap-2">
                          <span className="font-heading font-bold text-[10px] uppercase text-dark/60">
                            Your Answer:
                          </span>
                          <div className="flex-1 border-b-2 border-dotted border-dark h-5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detachable Answer Key */}
              <div className="mt-8 pt-6 border-t-2 border-dashed border-dark text-xs">
                <span className="font-heading font-black uppercase text-[10px] tracking-wider text-dark/60 block mb-2">
                  ✂️ Detachable Answer Key:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  {deck.cards.map((c, i) => (
                    <div key={c.id} className="p-1.5 bg-muted rounded border border-dark/10">
                      <strong>{i + 1}.</strong> {c.term}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. Cutout Flashcards Layout */}
          {printLayout === 'cards' && (
            <div className="grid grid-cols-2 gap-3">
              {deck.cards.map((c, i) => (
                <div
                  key={c.id}
                  className="border-2 border-dashed border-dark p-4 rounded-xl min-h-[140px] flex flex-col justify-between text-xs bg-white"
                >
                  <div className="flex items-center justify-between text-[10px] text-dark/50 font-mono pb-1 border-b border-dark/10">
                    <span>CARD #{i + 1}</span>
                    <span>✂️ CUT ALONG DASHES</span>
                  </div>
                  <div className="py-2 text-center">
                    <h3 className="font-heading font-black text-sm text-dark">{c.term}</h3>
                  </div>
                  <div className="pt-2 border-t border-dark/10 text-[11px] text-dark/80 line-clamp-3">
                    {c.definition}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions - Screen only */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-dark/10 print:hidden">
          <span className="text-xs text-dark/50 hidden sm:inline">
            💡 Tip: Use your browser's "Save as PDF" option to export as a digital study guide.
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full font-heading font-bold text-xs text-dark/70 hover:text-dark transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white font-heading font-black text-xs border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active transition-all flex items-center gap-2"
            >
              <Printer size={15} strokeWidth={3} />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
