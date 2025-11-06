'use client'

import React, { useState } from 'react';
import { genreData } from '@/data/genre';
import { FaCheck } from "react-icons/fa";
import Image from 'next/image';
import assets from "@/assets/assets";
import { motion, AnimatePresence } from "motion/react";

export default function GenreSelectionDialog() {
  const [isOpen, setIsOpen] = useState(true);
  const [showDialog, setShowDialog] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [step, setStep] = useState(1); // 1 = genre, 2 = komentar *ini buat pindah halaman brok
  const totalSteps = 2;
  const [commentEnabled, setCommentEnabled] = useState<boolean | null>(null);

  const handleSelect = (genre: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) return prev.filter((g) => g !== genre);
      if (prev.length >= 3) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
        return prev;
      }
      return [...prev, genre];
    });
  };

  const handleContinue = () => {
    if (step === 1 && selectedGenres.length > 0) {
      setStep(2);
    } else if (step === 2) {
      console.log("Selected genres:", selectedGenres);
      console.log("Comment feature:", commentEnabled ? "Enabled" : "Disabled");
      setIsOpen(false);
      setTimeout(() => setShowDialog(false), 400);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
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
            layout
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              layout: { duration: 0.4, ease: 'easeInOut' },
              duration: 0.4,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              layout
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
              className="p-7 max-w-2xl w-full max-h-[100vh] rounded-lg shadow-lg text-center flex flex-col gap-5 
                bg-white dark:bg-neutral-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col gap-2">
                <Image
                  className="lg:w-20 lg:h-20 md:w-20 md:h-20 sm:w-10 sm:h-10 w-10 h-10 mx-auto"
                  src={assets.logo}
                  alt="logo"
                />
                <h1 className="lg:text-2xl md:text-2xl sm:text-xl text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Selamat Datang di Victie
                </h1>
                <p className="lg:text-lg md:text-base sm:text-sm text-sm text-gray-700 dark:text-gray-300">
                  {step === 1
                    ? "Pilih maksimal 3 genre favoritmu untuk rekomendasi yang sesuai"
                    : "Apakah kamu ingin menyalakan fitur komen Dewasa?"}
                </p>
              </div>

              {/* Slider Wrapper */}
              <div className="relative w-full overflow-hidden">
                <motion.div
                  className="flex w-[200%]"
                  animate={{ x: step === 1 ? "0%" : "-50%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Step 1: Genre Selection */}
                  <div className="w-1/2 flex-shrink-0 flex flex-col gap-4">
                    <div
                      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 
                      max-h-[360px] md:max-h-[380px] overflow-y-auto pr-2 custom-scrollbar"
                    >
                      {genreData.map((item) => {
                        const Icon = item.icon;
                        const isSelected = selectedGenres.includes(item.genre);

                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelect(item.genre)}
                            className={`relative px-3 py-4 rounded-lg cursor-pointer flex flex-col justify-center items-center gap-3 text-center border-2 transition-all duration-300
                              ${
                                isSelected
                                  ? 'border-[var(--accent-color)] bg-[var(--accent-color)] text-white'
                                  : 'border-gray-300 hover:border-[var(--accent-color)] dark:border-gray-700 dark:hover:border-[var(--accent-color)]'
                              }`}
                          >
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors
                                ${isSelected ? 'bg-white/20 text-white' : `${item.color}`}
                              `}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <p className="font-medium text-sm md:text-base">{item.genre}</p>

                            {isSelected && (
                              <div className="absolute top-1 right-1 bg-white text-[var(--accent-color)] rounded-full p-1 shadow-md">
                                <FaCheck className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Comment Feature */}
                  <div className="w-1/2 flex-shrink-0 flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col gap-4 w-full">
                      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                      Fitur komentar Dewasa memungkinkan kamu melihat dan berpartisipasi dalam diskusi yang mungkin mengandung tema atau bahasa untuk pembaca dewasa.
                      </p>
                      <div className="flex justify-center gap-6">
                        <button
                          onClick={() => setCommentEnabled(true)}
                          className={`px-6 py-3 hover:cursor-pointer rounded-lg font-medium transition-all duration-300 
                            ${
                              commentEnabled === true
                                ? 'bg-[var(--accent-color)] text-white'
                                : 'border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-[var(--accent-color)]'
                            }`}
                        >
                          Iya
                        </button>
                        <button
                          onClick={() => setCommentEnabled(false)}
                          className={`px-6 py-3 hover:cursor-pointer rounded-lg font-medium transition-all duration-300 
                            ${
                              commentEnabled === false
                                ? 'bg-[var(--accent-color)] text-white'
                                : 'border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-[var(--accent-color)]'
                            }`}
                        >
                          Tidak
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Page Indicator (Dots) */}
              <div className="flex justify-center gap-2 mt-2">
                {[...Array(totalSteps)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step === i + 1
                        ? 'bg-[var(--accent-color)] scale-110'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  ></span>
                ))}
              </div>

              {/* Info Text */}
              {step === 1 && (
                <p id="genre-terpilih" className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  {selectedGenres.length > 0
                    ? `${selectedGenres.length} genre terpilih`
                    : 'Pilih minimal 1 genre untuk melanjutkan'}
                </p>
              )}

              {/* Buttons */}
              <div className={`flex ${step === 2 ? 'justify-between' : 'justify-center'} gap-4 w-full`}>
                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1/3 md:flex-1 py-4 text-base md:text-lg rounded-lg border border-gray-400 dark:border-gray-600 
                      text-gray-800 dark:text-gray-200 hover:border-[var(--accent-color)] transition-all duration-300 hover:cursor-pointer"
                  >
                    Kembali
                  </button>
                )}
                <button
                  type="button"
                  disabled={
                    (step === 1 && selectedGenres.length === 0) ||
                    (step === 2 && commentEnabled === null)
                  }
                  onClick={handleContinue}
                  className={`${
                    step === 2 ? 'flex-2/3 md:flex-1' : 'w-full'
                  } py-4 text-base md:text-lg rounded-lg text-white transition-all duration-300
                    ${
                      (step === 1 && selectedGenres.length === 0) ||
                      (step === 2 && commentEnabled === null)
                        ? 'bg-[var(--accent-color)]/70 opacity-50 cursor-not-allowed'
                        : 'bg-[var(--accent-color)] opacity-100 cursor-pointer'
                    }`}
                >
                  {step === 1 ? 'Lanjutkan' : 'Lanjutkan Membaca'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}