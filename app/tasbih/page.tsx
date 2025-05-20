"use client";
import React from 'react';

import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, RotateCcwIcon, PlusIcon, SaveIcon, TrashIcon, VolumeIcon } from 'lucide-react';

const TasbihCounter = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [activeAdhkar, setActiveAdhkar] = useState(0);
  const [showCompleteAnimation, setShowCompleteAnimation] = useState(false);
  type TasbihSession = {
    id: number;
    dhikr: string;
    arabic: string;
    count: number;
    target: number;
    date: string;
  };
  
  const [savedSessions, setSavedSessions] = useState<TasbihSession[]>([]);
  const [vibrate, setVibrate] = useState(true);
  const [playSound, setPlaySound] = useState(true);
  
  // Adhkar list - light on tongue but heavy in reward
  const adhkarList = [
    {
      arabic: "سُبْحَانَ اللهِ",
      transliteration: "Subhan Allah",
      translation: "Glory be to Allah",
      virtue: "Plants a palm tree in Paradise for each recitation",
      defaultTarget: 33
    },
    {
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: "Praise be to Allah",
      virtue: "Fills the scales of good deeds",
      defaultTarget: 33
    },
    {
      arabic: "اللهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      virtue: "No deed on the Day of Judgment is better",
      defaultTarget: 33
    },
    {
      arabic: "لا إلَهَ إلاّ اللهُ",
      transliteration: "La ilaha illallah",
      translation: "There is no god but Allah",
      virtue: "The best remembrance, and the best that all Prophets have said",
      defaultTarget: 100
    },
    {
      arabic: "لا حَوْلَ وَلا قُوَّةَ إِلا بِاللهِ",
      transliteration: "La hawla wa la quwwata illa billah",
      translation: "There is no might nor power except with Allah",
      virtue: "A treasure from the treasures of Paradise",
      defaultTarget: 100
    },
    {
      arabic: "أَسْتَغْفِرُ اللهَ",
      transliteration: "Astaghfirullah",
      translation: "I seek forgiveness from Allah",
      virtue: "Whoever continues to ask forgiveness, Allah will provide relief from every worry",
      defaultTarget: 100
    },
    {
      arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيمِ",
      transliteration: "Subhan Allah wa bihamdihi, Subhan Allah al-Azim",
      translation: "Glory be to Allah and praise Him, Glory be to Allah the Magnificent",
      virtue: "Two phrases beloved to Allah, light on the tongue but heavy on the scales",
      defaultTarget: 100
    }
  ];
  
  // Load saved sessions from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('tasbihDarkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      // Default to user's system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    
    const savedSessions = localStorage.getItem('tasbihSessions');
    if (savedSessions) {
      setSavedSessions(JSON.parse(savedSessions));
    }
    
    const savedVibrate = localStorage.getItem('tasbihVibrate');
    if (savedVibrate !== null) {
      setVibrate(savedVibrate === 'true');
    }
    
    const savedSound = localStorage.getItem('tasbihSound');
    if (savedSound !== null) {
      setPlaySound(savedSound === 'true');
    }
  }, []);
  
  // Update localStorage when darkMode changes
  useEffect(() => {
    localStorage.setItem('tasbihDarkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem('tasbihVibrate', vibrate.toString());
    localStorage.setItem('tasbihSound', playSound.toString());
  }, [vibrate, playSound]);
  
  // Save sessions to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tasbihSessions', JSON.stringify(savedSessions));
  }, [savedSessions]);
  
  // Handle target change when selecting a different dhikr
  useEffect(() => {
    setTarget(adhkarList[activeAdhkar].defaultTarget);
    setCount(0);
  }, [activeAdhkar, adhkarList]);
  
  // Check if target is reached and handle completion animation
  useEffect(() => {
    if (count === target && target > 0) {
      setShowCompleteAnimation(true);
      
      // Play sound if enabled
      if (playSound) {
        const audio = new Audio('/complete-sound.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      
      // Vibrate if enabled and supported
      if (vibrate && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      
      // Hide animation after delay
      setTimeout(() => {
        setShowCompleteAnimation(false);
      }, 2000);
    }
  }, [count, target, vibrate, playSound]);

  const increment = () => {
    if (count < target || target === 0) {
      setCount(prevCount => prevCount + 1);
      
      // Short vibration for tactile feedback if enabled
      if (vibrate && navigator.vibrate) {
        navigator.vibrate(10);
      }
      
      // Play tick sound if enabled
      if (playSound) {
        const audio = new Audio('/tick-sound.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  };

  const reset = () => {
    setCount(0);
  };

  const saveSession = () => {
    const newSession = {
      id: Date.now(),
      dhikr: adhkarList[activeAdhkar].transliteration,
      arabic: adhkarList[activeAdhkar].arabic,
      count: count,
      target: target,
      date: new Date().toLocaleString()
    };
    
    setSavedSessions(prev => [newSession, ...prev]);
  };

  const deleteSession = (id: number) => {
    setSavedSessions(prev => prev.filter(session => session.id !== id));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Digital Tasbih</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
        
        {/* Dhikr Selection */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Dhikr
          </label>
          <select 
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white"
            value={activeAdhkar}
            onChange={(e) => setActiveAdhkar(parseInt(e.target.value))}
          >
            {adhkarList.map((dhikr, index) => (
              <option key={index} value={index}>
                {dhikr.transliteration} - {dhikr.translation}
              </option>
            ))}
          </select>
        </div>
        
        {/* Current Dhikr Display */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-3xl font-bold mb-2 text-emerald-600 dark:text-emerald-400">
            {adhkarList[activeAdhkar].arabic}
          </h2>
          <p className="text-lg mb-1 text-gray-700 dark:text-gray-300">
            {adhkarList[activeAdhkar].transliteration}
          </p>
          <p className="text-md mb-3 text-gray-600 dark:text-gray-400">
            {adhkarList[activeAdhkar].translation}
          </p>
          <div className="text-sm p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-700 dark:text-emerald-300">
            <strong>Virtue:</strong> {adhkarList[activeAdhkar].virtue}
          </div>
        </div>
        
        {/* Counter Display */}
        <div className="mb-4 relative">
          {showCompleteAnimation && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="animate-ping bg-emerald-400 dark:bg-emerald-600 rounded-full h-full w-full opacity-75"></div>
            </div>
          )}
          <div 
            className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-8 text-center cursor-pointer relative overflow-hidden transition-all duration-200 transform hover:scale-105"
            onClick={increment}
          >
            <div className="relative z-20">
              <div className="text-5xl font-bold mb-2 text-emerald-600 dark:text-emerald-400">
                {count}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Target: {target > 0 ? target : '∞'}
              </div>
              {target > 0 && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((count / target) * 100, 100)}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <button 
            onClick={reset}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Reset counter"
          >
            <RotateCcwIcon size={20} className="mr-1" />
            Reset
          </button>
          <button 
            onClick={saveSession}
            className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-200 dark:hover:bg-emerald-700 transition"
            aria-label="Save session"
          >
            <SaveIcon size={20} className="mr-1" />
            Save
          </button>
          <div className="relative">
            <input 
              type="number" 
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
              min="0"
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white w-full border border-gray-300 dark:border-gray-600"
              aria-label="Set target count"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-gray-500 dark:text-gray-400">
              Target
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Settings</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 dark:text-gray-300">Vibration</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={vibrate} onChange={() => setVibrate(!vibrate)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Sound</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={playSound} onChange={() => setPlaySound(!playSound)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
        
        {/* Saved Sessions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">Saved Sessions</h3>
          
          {savedSessions.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-4">No saved sessions yet</p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {savedSessions.map(session => (
                <div key={session.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">{session.dhikr}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{session.date}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium mr-3">
                      {session.count}/{session.target > 0 ? session.target : '∞'}
                    </span>
                    <button 
                      onClick={() => deleteSession(session.id)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      aria-label="Delete session"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Tap the counter circle to increase count.</p>
          <p className="mt-1">Set target to 0 for infinite counting.</p>
        </div>
      </div>
    </div>
  );
};

export default TasbihCounter;