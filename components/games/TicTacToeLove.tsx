"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock } from "lucide-react";

type Cell = "X" | "O" | null;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const STORAGE_KEY = "love-timeline-xo-state";

interface Props {
  letter?: {
    title: string;
    body: string;
    signature?: string;
  };
}

export default function TicTacToeLove({ letter }: Props) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [wins, setWins] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [roundLocked, setRoundLocked] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Load state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setWins(parsed.wins ?? 0);
      setUnlocked(parsed.unlocked ?? false);
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ wins, unlocked }));
  }, [wins, unlocked]);

  const checkWinner = (b: Cell[]) => {
    for (const [a, b1, c] of WIN_LINES) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const isTie = (b: Cell[]) => b.every((c) => c !== null);

  const cpuMove = (b: Cell[]) => {
    const empty = b
      .map((v, i) => (v === null ? i : null))
      .filter((v) => v !== null) as number[];

    if (!empty.length) return b;

    // eslint-disable-next-line react-hooks/purity
    const idx = empty[Math.floor(Math.random() * empty.length)];
    const next = [...b];
    next[idx] = "O";
    return next;
  };

  const resetRound = (msg?: string) => {
    if (msg) setStatus(msg);
    setRoundLocked(true);

    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setStatus(null);
      setRoundLocked(false);
    }, 1000);
  };

  const handleMove = (i: number) => {
    if (board[i] || unlocked || roundLocked) return;

    let next = [...board];
    next[i] = "X";
    setBoard(next);

    const userWin = checkWinner(next);
    if (userWin === "X") {
      const nextWins = wins + 1;
      setWins(nextWins);

      if (nextWins >= 3) {
        setUnlocked(true);
        setTimeout(() => setShowLetter(true), 500);
        return;
      }

      return resetRound("You win this round 💖");
    }

    if (isTie(next)) {
      return resetRound("It’s a tie 💞");
    }

    // CPU move (delayed)
    setRoundLocked(true);
    setTimeout(() => {
      const cpuBoard = cpuMove(next);
      setBoard(cpuBoard);

      const cpuWin = checkWinner(cpuBoard);
      if (cpuWin === "O") {
        return resetRound("I win this one 😌");
      }

      if (isTie(cpuBoard)) {
        return resetRound("A sweet tie 💗");
      }

      setRoundLocked(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 text-center">
      <h3 className="text-2xl font-bold mb-1 mt-10">
        A Little Game For You 💗
      </h3>

      {!unlocked ? (
        <p className="text-gray-600 mb-2">
          Win <b>3 times</b> to unlock something special
        </p>
      ) : (
        <p className="text-pink-600 font-semibold mb-2 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          Unlocked forever
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-3">
        {board.map((cell, i) => (
          <button
            key={i}
            disabled={unlocked}
            onClick={() => handleMove(i)}
            className={`aspect-square rounded-xl text-3xl font-bold transition
              ${
                unlocked
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-pink-50 hover:bg-pink-100"
              }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {status && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-pink-600 font-medium mb-2"
          >
            {status}
          </motion.p>
        )}
      </AnimatePresence>

      {!unlocked && (
        <p className="text-sm text-gray-500">Your wins: {wins} / 3</p>
      )}

      {unlocked && (
        <button
          onClick={() => setShowLetter(true)}
          className="mt-3 text-pink-600 font-semibold underline"
        >
          Open the letter again 💌
        </button>
      )}

      <AnimatePresence>
        {showLetter && letter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          >
            <div className="bg-linear-to-br from-pink-500 to-rose-500 text-white rounded-3xl p-8 max-w-lg shadow-2xl">
              <Heart className="w-14 h-14 mx-auto mb-4 fill-white" />
              <h4 className="text-2xl font-bold mb-4">{letter.title}</h4>

              <p className="whitespace-pre-line leading-relaxed mb-6">
                {letter.body}
              </p>

              {letter.signature && (
                <p className="text-right font-semibold">{letter.signature}</p>
              )}

              <button
                onClick={() => setShowLetter(false)}
                className="mt-6 bg-white text-pink-600 px-6 py-2 rounded-full font-semibold"
              >
                Close 💕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
