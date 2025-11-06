'use client'

import React, { useState } from 'react';
import { genreData } from '@/data/genre';
import { FaCheck } from "react-icons/fa";
import Image from 'next/image';
import assets from "@/assets/assets";
import { motion, AnimatePresence } from "motion/react";

export default function GenreSelectionDialog() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleSelect = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleContinue = () => {
    if (selectedGenres.length > 0) {
      console.log('Selected genres:', selectedGenres);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Tambahkan padding & support dark mode */}
        <div className="p-7 mx-4 max-w-2xl max-h-[100vh] rounded-lg shadow-lg text-center flex flex-col lg:gap-5 md:gap-5 sm:gap-4 gap-4 
          bg-white dark:bg-neutral-900 dark:text-gray-100 transition-colors duration-300">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <Image className="lg:w-20 lg:h-20 md:w-20 md:h-20 sm:w-10 sm:h-10 w-10 h-10 mx-auto" src={assets.logo} alt="logo" />
            <h1 className="lg:text-2xl md:text-2xl sm:text-xl text-lg font-semibold text-gray-900 dark:text-gray-100">
              Selamat Datang di Victie
            </h1>
            <p className="lg:text-lg md:text-base sm:text-sm text-sm text-gray-700 dark:text-gray-300">
              Pilih genre cerita favoritmu untuk mendapatkan rekomendasi yang sesuai dengan selera bacaanmu
            </p>
          </div>

          {/* Grid Genre */}
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 
            max-h-[360px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {genreData.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedGenres.includes(item.genre);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.genre)}
                  className={`relative lg:px-3 lg:py-5 md:px-3 md:py-5 sm:px-2 sm:py-4 px-1 py-3 rounded-lg cursor-pointer flex flex-col justify-center items-center gap-3 text-center border-2 transition-all duration-300
                    ${
                      isSelected
                        ? 'border-[var(--accent-color)] bg-[var(--accent-color)] text-white'
                        : 'border-gray-300 hover:border-[var(--accent-color)] dark:border-gray-700 dark:hover:border-[var(--accent-color)]'
                    }`}
                >
                  <div
                    className={`lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-7 sm:h-7 w-6 h-6 flex items-center justify-center rounded-full transition-colors
                      ${isSelected ? 'bg-white/20 text-white' : `${item.color}`}
                    `}
                  >
                    <Icon className="lg:w-7 lg:h-7 md:w-7 md:h-7 sm:w-5 sm:h-5 w-4 h-4" />
                  </div>
                  <p className="font-medium lg:text-lg md:text-lg sm:text-base text-sm">{item.genre}</p>

                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-white text-[var(--accent-color)] rounded-full p-1 shadow-md">
                      <FaCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Info text */}
          <p id="genre-terpilih" className="text-gray-600 dark:text-gray-400 lg:text-lg md:text-lg sm:text-sm text-sm">
            {selectedGenres.length > 0
              ? `${selectedGenres.length} genre terpilih`
              : 'Pilih minimal 1 genre untuk melanjutkan'}
          </p>

          {/* Button Continue */}
          <button
            type="button"
            disabled={selectedGenres.length === 0}
            onClick={handleContinue}
            className={`w-full lg:py-5 md:py-5 sm:py-4 py-3 lg:text-lg md:text-lg sm:text-base text-sm rounded-lg text-white transition-all duration-300
              ${
                selectedGenres.length > 0
                  ? 'bg-[var(--accent-color)] opacity-100 cursor-pointer'
                  : 'bg-[var(--accent-color)]/70 opacity-50 cursor-not-allowed'
              }`}
          >
            Lanjutkan Membaca
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}