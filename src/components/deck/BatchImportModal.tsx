import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Upload, AlertCircle, FileText } from 'lucide-react';
import { sounds } from '../../services/sound';

interface BatchImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (rawText: string) => number;
  deckTitle: string;
}

export const BatchImportModal: React.FC<BatchImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
  deckTitle,
}) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [previewCount, setPreviewCount] = useState(0);

  const handleTextChange = (val: string) => {
    setText(val);
    if (!val.trim()) {
      setPreviewCount(0);
      return;
    }
    const lines = val.split('\n');
    let count = 0;
    for (const l of lines) {
      if (
        l.includes('\t') ||
        l.includes(' - ') ||
        l.includes(' | ') ||
        l.includes(';') ||
        l.includes(',')
      ) {
        count++;
      }
    }
    setPreviewCount(count);
  };

  const handleImport = () => {
    if (!text.trim()) {
      setError('Please paste terms and definitions');
      return;
    }

    const imported = onImport(text);
    if (imported === 0) {
      setError('Could not detect valid lines. Separate term and definition with Tab, hyphen ( - ), or comma.');
      return;
    }

    sounds.playCorrect();
    setText('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Batch Import: ${deckTitle}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        <p className="text-xs font-medium text-dark/70 leading-relaxed">
          Copy and paste text from Word, Excel, or Google Docs.
          Use <strong className="text-accent font-mono font-black">Tab</strong>, <strong className="text-accent font-mono font-black">" - "</strong>, or <strong className="text-accent font-mono font-black">comma</strong> between term and definition.
        </p>

        {error && (
          <div className="p-3 bg-rose-50 border-2 border-rose-500 rounded-2xl text-xs font-heading font-bold text-rose-700 flex items-center gap-2 shadow-pop-active">
            <AlertCircle size={14} strokeWidth={2.5} /> {error}
          </div>
        )}

        <div>
          <textarea
            rows={8}
            value={text}
            onChange={e => handleTextChange(e.target.value)}
            placeholder={`Photosynthesis \t Process by which plants convert light energy into chemical energy\nMitosis \t Cell division resulting in two identical daughter cells\nEntropy \t Measure of disorder or randomness in a closed thermodynamic system`}
            className="w-full px-4 py-3 rounded-2xl bg-cream border-2 border-dark text-dark placeholder-dark/40 focus:outline-none focus:bg-white focus:shadow-pop-violet text-xs font-mono leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2 text-xs">
          <div className="flex items-center gap-2 font-heading font-black text-dark">
            <FileText size={15} strokeWidth={2.5} className="text-accent" />
            <span>Detected: <strong className="px-2 py-0.5 rounded-md bg-tertiary border-2 border-dark shadow-pop-active">{previewCount}</strong> cards</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full font-heading font-bold text-dark/70 hover:text-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={previewCount === 0}
              className="px-6 py-2.5 rounded-full font-heading font-black bg-accent hover:bg-accent-hover disabled:opacity-40 text-white border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active transition-all flex items-center gap-1.5"
            >
              <Upload size={14} strokeWidth={3} /> Import Cards
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
