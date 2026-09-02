import React, { useState, useEffect, useRef } from 'react';
import { Deck, MatchTile } from '../../types';
import { ArrowLeft, RotateCcw, Clock, Trophy, Play, Sparkles } from 'lucide-react';
import { sounds } from '../../services/sound';
import confetti from 'canvas-confetti';

interface MatchGameProps {
  deck: Deck;
  onBack: () => void;
}

export const MatchGame: React.FC<MatchGameProps> = ({ deck, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tiles, setTiles] = useState<MatchTile[]>([]);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initGame = () => {
    const shuffledCards = [...deck.cards].sort(() => Math.random() - 0.5).slice(0, 6);

    const generatedTiles: MatchTile[] = [];
    shuffledCards.forEach(card => {
      generatedTiles.push({
        id: `term-${card.id}`,
        cardId: card.id,
        text: card.term,
        type: 'term',
        isMatched: false,
        isSelected: false,
        isError: false,
      });
      generatedTiles.push({
        id: `def-${card.id}`,
        cardId: card.id,
        text: card.definition,
        type: 'definition',
        isMatched: false,
        isSelected: false,
        isError: false,
      });
    });

    const randomized = generatedTiles.sort(() => Math.random() - 0.5);
    setTiles(randomized);
    setSelectedTileId(null);
    setIsGameOver(false);
    setIsChecking(false);
    setTimeSeconds(0);
    setIsPlaying(true);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeSeconds(prev => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTileClick = (clickedTile: MatchTile) => {
    if (isChecking || clickedTile.isMatched || clickedTile.isSelected || clickedTile.isError) return;

    sounds.playClick();

    if (!selectedTileId) {
      setSelectedTileId(clickedTile.id);
      setTiles(prev =>
        prev.map(t => (t.id === clickedTile.id ? { ...t, isSelected: true } : t))
      );
      return;
    }

    const firstTile = tiles.find(t => t.id === selectedTileId);
    if (!firstTile || firstTile.id === clickedTile.id) return;

    setIsChecking(true);
    const isMatch = firstTile.cardId === clickedTile.cardId && firstTile.type !== clickedTile.type;

    if (isMatch) {
      sounds.playCorrect();
      const updatedTiles = tiles.map(t =>
        t.id === firstTile.id || t.id === clickedTile.id
          ? { ...t, isSelected: false, isMatched: true }
          : t
      );
      setTiles(updatedTiles);
      setSelectedTileId(null);
      setIsChecking(false);

      const remaining = updatedTiles.filter(t => !t.isMatched);
      if (remaining.length === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsGameOver(true);
        sounds.playComplete();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#F472B6', '#FBBF24', '#34D399'],
        });
      }
    } else {
      sounds.playIncorrect();
      setTiles(prev =>
        prev.map(t =>
          t.id === firstTile.id || t.id === clickedTile.id
            ? { ...t, isSelected: false, isError: true }
            : t
        )
      );
      setTimeout(() => {
        setTiles(prev =>
          prev.map(t => (t.id === firstTile.id || t.id === clickedTile.id ? { ...t, isError: false } : t))
        );
        setSelectedTileId(null);
        setIsChecking(false);
      }, 500);
    }
  };

  if (!isPlaying) {
    return (
      <div className="max-w-md mx-auto py-16 px-6 text-center space-y-6 animate-fade-in pb-20">
        <div className="w-20 h-20 mx-auto rounded-full bg-quaternary border-2 border-dark flex items-center justify-center shadow-pop animate-bounce-in">
          <Clock size={36} strokeWidth={2.5} className="text-dark" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-tertiary border-2 border-dark text-xs font-heading font-black shadow-pop-active">
            <Sparkles size={12} strokeWidth={3} />
            <span>SPEED MATCH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-dark tracking-tight">
            Make Everything Disappear!
          </h1>
          <p className="text-xs font-medium text-dark/70 leading-relaxed max-w-sm mx-auto">
            Tap or click corresponding terms and definitions to match them and clear the board against the stopwatch.
          </p>
        </div>

        <button
          onClick={initGame}
          className="w-full py-4 rounded-full bg-accent hover:bg-accent-hover text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active transition-all flex items-center justify-center gap-2"
        >
          <Play size={16} strokeWidth={3} className="fill-white" /> Start Game
        </button>

        <button
          onClick={onBack}
          className="text-xs font-heading font-bold text-dark/50 hover:text-dark transition-colors block mx-auto"
        >
          Back to Set
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Match Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-dark text-xs font-heading font-extrabold text-dark shadow-pop-active hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft size={14} strokeWidth={2.5} /> Back to Set
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary border-2 border-dark text-dark font-heading font-black text-sm shadow-pop-active">
            <Clock size={16} strokeWidth={2.5} />
            <span>{timeSeconds}s</span>
          </div>

          <button
            onClick={initGame}
            className="w-10 h-10 rounded-full bg-white border-2 border-dark text-dark hover:bg-cream shadow-pop-active active:shadow-none flex items-center justify-center transition-all"
            title="Restart Game"
          >
            <RotateCcw size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {isGameOver ? (
        <div className="max-w-md mx-auto py-12 px-8 rounded-3xl bg-white border-2 border-dark text-center space-y-6 shadow-pop animate-bounce-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-quaternary border-2 border-dark flex items-center justify-center shadow-pop">
            <Trophy size={36} strokeWidth={2.5} className="text-dark" />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-heading font-black text-dark">Magnificent!</h2>
            <p className="text-xs font-heading font-black text-dark/50 uppercase tracking-wider">Your Completion Time</p>
            <p className="text-6xl font-heading font-black text-accent pt-1">{timeSeconds}s</p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={initGame}
              className="px-6 py-3 rounded-full font-heading font-black text-xs uppercase tracking-wider bg-accent hover:bg-accent-hover text-white border-2 border-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <RotateCcw size={14} strokeWidth={2.5} /> Play Again
            </button>
            <button
              onClick={onBack}
              className="px-5 py-3 rounded-full font-heading font-bold text-xs text-dark bg-cream border-2 border-dark shadow-pop-active"
            >
              Back to Set
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tiles.map(tile => {
            if (tile.isMatched) {
              return (
                <div
                  key={tile.id}
                  className="min-h-[130px] rounded-3xl border-2 border-dashed border-dark/20 opacity-20 pointer-events-none transition-all duration-300"
                />
              );
            }

            let tileStyle =
              'bg-white border-2 border-dark text-dark shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-lg';

            if (tile.isSelected) {
              tileStyle =
                'bg-accent text-white border-2 border-dark shadow-pop scale-[1.02] ring-2 ring-accent';
            } else if (tile.isError) {
              tileStyle =
                'bg-secondary text-white border-2 border-dark shadow-pop animate-wiggle';
            }

            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => handleTileClick(tile)}
                className={`min-h-[130px] p-4 rounded-3xl text-center flex flex-col items-center justify-between transition-all duration-150 cursor-pointer active:scale-95 ${tileStyle}`}
              >
                <span className="text-xs font-heading font-bold leading-relaxed line-clamp-4 my-auto">
                  {tile.text}
                </span>
                <span className={`text-[9px] uppercase font-heading font-black px-2.5 py-0.5 rounded-full border border-dark/30 mt-2 ${
                  tile.isSelected || tile.isError ? 'bg-white/20 text-white' : 'bg-cream text-dark/60'
                }`}>
                  {tile.type === 'term' ? 'Term' : 'Definition'}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
