'use client';

import React, { useEffect, useState } from 'react';
import { genreData } from '@/data/genre';
import { FaCheck } from "react-icons/fa";
import Image from 'next/image';
import assets from "@/assets/assets";
import { motion, AnimatePresence } from "motion/react";

export default function GenreSelectionDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [r18, setR18] = useState<boolean | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // ✅ Fetch user settings saat load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/user/settings', { credentials: 'include' });
        const data = await res.json();

        if (data.chosenGenre?.length < 1) {
          setIsOpen(true);
          setShowDialog(true);
        } else {
          console.log('User sudah memilih genre:', data);
        }
      } catch (err) {
        console.error('Gagal memuat pengaturan user:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleSelect = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < 3
        ? [...prev, genre]
        : prev
    );
  };

  const handleContinue = () => {
    if (selectedGenres.length > 0) setCurrentPage(2);
  };

  const handleFinalSubmit = async () => {
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chosenGenre: selectedGenres, r18 }),
      });

      const data = await res.json();
      console.log(data);

      if (data.status === 'success') {
        setIsOpen(false);
        setTimeout(() => setShowDialog(false), 400);
      }
    } catch (err) {
      console.error('Gagal menyimpan pengaturan:', err);
    }
  };

  if (!showDialog) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          {/* Dialog */}
          <motion.div
            key="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              layout
              className="p-7 max-w-2xl max-h-[100vh] rounded-lg shadow-lg text-center flex flex-col gap-5 
              bg-white dark:bg-neutral-900 dark:text-gray-100 transition-all duration-300"
            >
              <Image className="w-16 h-16 mx-auto" src={assets.logo} alt="logo" />
              <h1 className="text-2xl font-semibold">Selamat Datang di Victie</h1>

              {/* Page Indicator */}
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? 'bg-[var(--accent-color)] scale-110'
                        : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {currentPage === 1 && (
                <>
                  <p className="text-gray-700 dark:text-gray-300">
                    Pilih maksimal 3 genre cerita favoritmu untuk rekomendasi bacaan.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 
                    max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                    {genreData.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedGenres.includes(item.genre);
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.genre)}
                          className={`relative px-3 py-5 rounded-lg cursor-pointer flex flex-col justify-center items-center gap-3 text-center border-2 transition-all duration-300
                            ${
                              isSelected
                                ? 'border-[var(--accent-color)] bg-[var(--accent-color)] text-white'
                                : 'border-gray-300 hover:border-[var(--accent-color)] dark:border-gray-700'
                            }`}
                        >
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${isSelected ? 'bg-white/20 text-white' : item.color}`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <p className="font-medium">{item.genre}</p>
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-white text-[var(--accent-color)] rounded-full p-1 shadow-md">
                              <FaCheck className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {selectedGenres.length > 0
                      ? `${selectedGenres.length} genre terpilih`
                      : 'Pilih minimal 1 genre untuk melanjutkan'}
                  </p>
                  <button
                    onClick={handleContinue}
                    disabled={selectedGenres.length === 0}
                    className={`w-full py-3 rounded-lg text-white text-lg transition-all duration-300 ${
                      selectedGenres.length > 0
                        ? 'bg-[var(--accent-color)]'
                        : 'bg-[var(--accent-color)]/60 cursor-not-allowed'
                    }`}
                  >
                    Lanjutkan
                  </button>
                </>
              )}

              {currentPage === 2 && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                    Apakah kamu ingin menyalakan fitur komen Dewasa?
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fitur komentar Dewasa memungkinkan kamu berinteraksi dengan pembaca lain dalam diskusi terbuka.
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => setR18(true)}
                      className={`px-5 py-3 rounded-lg border transition-all duration-300 ${
                        r18 === true
                          ? 'bg-[var(--accent-color)] text-white'
                          : 'border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      Iya
                    </button>
                    <button
                      onClick={() => setR18(false)}
                      className={`px-5 py-3 rounded-lg border transition-all duration-300 ${
                        r18 === false
                          ? 'bg-[var(--accent-color)] text-white'
                          : 'border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                  <div className="flex justify-between mt-6 gap-3">
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="w-1/3 py-3 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={r18 === null}
                      className={`w-2/3 py-3 rounded-lg text-white text-lg transition-all duration-300 ${
                        r18 !== null
                          ? 'bg-[var(--accent-color)]'
                          : 'bg-[var(--accent-color)]/60 cursor-not-allowed'
                      }`}
                    >
                      Lanjutkan Membaca
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
