import React, { useRef, useState } from 'react';
import {
  Search,
  Plus,
  Volume2,
  VolumeX,
  Download,
  Upload,
  RotateCcw,
  BookOpen,
  ChevronDown,
  Zap,
  Sun,
  Moon,
  SlidersHorizontal,
} from 'lucide-react';
import { sounds } from '../../services/sound';

interface NavbarProps {
  onGoHome: () => void;
  onNewDeck: () => void;
  onExportJSON: () => void;
  onImportJSON: (jsonStr: string) => void;
  onResetDefaults: () => void;
  currentDeckTitle?: string;
  activeView: string;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onGoHome,
  onNewDeck,
  onExportJSON,
  onImportJSON,
  onResetDefaults,
  currentDeckTitle,
  activeView,
  isSoundMuted,
  onToggleSound,
  isDarkMode,
  onToggleTheme,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const content = evt.target?.result as string;
      if (content) {
        onImportJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left Section: FlashPop Brand & Nav */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <button
            onClick={onGoHome}
            className="flex items-center gap-3 group transition-transform active:scale-95"
            title="FlashPop Home"
          >
            {/* FlashPop Sticker Logo Badge */}
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-accent border-2 border-dark shadow-pop flex items-center justify-center text-white font-heading font-black text-lg tracking-tighter group-hover:rotate-6 transition-transform">
                FP
              </div>
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-tertiary border-2 border-dark flex items-center justify-center shadow-pop-active">
                <Zap size={10} strokeWidth={3} className="text-dark fill-dark" />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-dark">
                  FlashPop
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary border border-dark inline-block animate-pulse" />
              </div>
              <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider text-dark/50 hidden sm:block -mt-1">
                Smart Flashcards & Quizzes
              </span>
            </div>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-3 font-heading font-bold text-sm text-dark">
            <button
              onClick={onGoHome}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                activeView === 'decks'
                  ? 'bg-tertiary border-dark shadow-pop text-dark -translate-y-0.5'
                  : 'border-transparent hover:border-dark hover:bg-muted text-dark'
              }`}
            >
              Your Library
            </button>

            {currentDeckTitle && activeView !== 'decks' && (
              <span className="text-xs font-bold text-dark/70 truncate max-w-[160px] bg-cream px-3 py-1.5 rounded-full border-2 border-dark shadow-pop-active hidden lg:inline-block">
                {currentDeckTitle}
              </span>
            )}

            {/* Candy Button: Create Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCreateDropdown(!showCreateDropdown);
                  setShowSettingsDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent hover:bg-accent-hover text-white font-heading font-extrabold border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-white text-accent flex items-center justify-center shadow-sm">
                  <Plus size={14} strokeWidth={3} />
                </div>
                <span>Create</span>
                <ChevronDown size={14} strokeWidth={2.5} />
              </button>

              {showCreateDropdown && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-2xl border-2 border-dark shadow-pop-lg py-2 z-50 animate-bounce-in"
                  onClick={() => setShowCreateDropdown(false)}
                >
                  <button
                    onClick={onNewDeck}
                    className="w-full px-4 py-2.5 text-left text-xs font-heading font-bold text-dark hover:bg-tertiary-light flex items-center gap-2.5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center border-2 border-dark shadow-pop-active">
                      <BookOpen size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="block font-black text-sm">Flashcard Set</span>
                      <span className="text-[10px] text-dark/60 font-normal">Terms, definitions & test quiz</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Middle: Generous Spacious Search bar */}
        <div className="flex-1 max-w-sm sm:max-w-md hidden sm:block mx-2">
          <div className="relative w-full">
            <Search size={18} strokeWidth={2.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40" />
            <input
              type="text"
              placeholder="Search study sets, terms..."
              onClick={onGoHome}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-cream border-2 border-dark text-xs font-bold text-dark placeholder-dark/40 shadow-pop-active focus:outline-none focus:bg-white focus:shadow-pop-violet transition-all"
            />
          </div>
        </div>

        {/* Right Section: Neatly Spaced Tactile Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Night / Dark Theme toggle */}
          <button
            onClick={() => {
              onToggleTheme();
              sounds.playClick();
            }}
            className={`w-10 h-10 rounded-full border-2 border-dark flex items-center justify-center transition-all shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active ${
              isDarkMode ? 'bg-tertiary text-dark' : 'bg-white text-dark'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Night/Dark Mode'}
          >
            {isDarkMode ? (
              <Sun size={17} strokeWidth={2.5} className="fill-dark text-dark" />
            ) : (
              <Moon size={17} strokeWidth={2.5} />
            )}
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sounds.playClick();
            }}
            className={`w-10 h-10 rounded-full border-2 border-dark flex items-center justify-center transition-all ${
              isSoundMuted
                ? 'bg-muted text-dark/40 shadow-none'
                : 'bg-tertiary text-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active'
            }`}
            title={isSoundMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isSoundMuted ? <VolumeX size={17} strokeWidth={2.5} /> : <Volume2 size={17} strokeWidth={2.5} />}
          </button>

          {/* Settings & Backup Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSettingsDropdown(!showSettingsDropdown);
                setShowCreateDropdown(false);
              }}
              className="w-10 h-10 rounded-full bg-white border-2 border-dark text-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:shadow-pop-active flex items-center justify-center transition-all"
              title="Settings, Backup & Restore"
            >
              <SlidersHorizontal size={16} strokeWidth={2.5} />
            </button>

            {showSettingsDropdown && (
              <div
                className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border-2 border-dark shadow-pop-lg py-2 z-50 animate-bounce-in text-xs font-heading font-bold"
                onClick={() => setShowSettingsDropdown(false)}
              >
                <div className="px-4 py-1.5 text-[10px] text-dark/40 uppercase tracking-wider font-extrabold border-b border-dark/10">
                  Data & Backup
                </div>

                <button
                  onClick={onExportJSON}
                  className="w-full px-4 py-2.5 text-left text-dark hover:bg-cream flex items-center gap-2.5 transition-colors"
                >
                  <Download size={15} strokeWidth={2.5} className="text-accent" />
                  <span>Download Backup (.json)</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2.5 text-left text-dark hover:bg-cream flex items-center gap-2.5 transition-colors"
                >
                  <Upload size={15} strokeWidth={2.5} className="text-secondary" />
                  <span>Import Backup (.json)</span>
                </button>

                <div className="my-1 border-t border-dark/10" />

                <button
                  onClick={() => {
                    if (window.confirm('Reset all sets to default collections?')) {
                      onResetDefaults();
                    }
                  }}
                  className="w-full px-4 py-2.5 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
                >
                  <RotateCcw size={15} strokeWidth={2.5} />
                  <span>Restore Starter Sets</span>
                </button>
              </div>
            )}
          </div>

          {/* Hidden file upload for backup import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          {/* User Profile Avatar with Pop Shadow */}
          <div
            className="w-10 h-10 rounded-full bg-secondary border-2 border-dark text-white font-heading font-black text-sm flex items-center justify-center shadow-pop select-none cursor-pointer"
            title="User Profile: Afya"
          >
            A
          </div>
        </div>
      </div>
    </header>
  );
};
