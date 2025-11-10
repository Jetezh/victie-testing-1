'use client'

import React, { useEffect, useState } from 'react';
import { genreData } from '@/data/genre';
import { FaCheck } from "react-icons/fa";
import Image from 'next/image';
import assets from "@/assets/assets";
import { motion, AnimatePresence } from "motion/react";

export default function GenreSelectionDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [step, setStep] = useState(1); // 1 = genre, 2 = komentar
  const totalSteps = 2;
  const [r18, setR18] = useState<boolean | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === 1. LOGIKA FETCH DATA DARI BACKEND ===
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/user/settings', { credentials: 'include' });
        const data = await res.json();

        // Jika user belum memilih genre, tampilkan dialog
        if (data.chosenGenre?.length < 1) {
          setIsOpen(true);
          setShowDialog(true);
        } else {
          console.log('User sudah memilih genre:', data);
        }
      } catch (err) {
        console.error('Gagal memuat pengaturan user:', err);
        // Opsi: Tampilkan dialog default jika fetch gagal (asumsi user baru)
        setIsOpen(true);
        setShowDialog(true);
      }
    };
    fetchSettings();
  }, []);

  // === 2. LOGIKA PILIH GENRE (Mempertahankan Animasi Shake) ===
  const handleSelect = (genre: string) => {
    setSelectedGenres((prev) => {
      // Menghapus genre
      if (prev.includes(genre)) return prev.filter((g) => g !== genre);
      
      // Memeriksa batas 3 genre (Logika Shake yang Anda inginkan)
      if (prev.length >= 3) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
        return prev;
      }
      // Menambah genre
      return [...prev, genre];
    });
  };

  // === 3. LOGIKA LANJUTKAN DAN SUBMIT AKHIR ===
  const handleContinue = () => {
    if (step === 1 && selectedGenres.length > 0) {
      setStep(2);
    } else if (step === 2 && r18 !== null) {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const handleFinalSubmit = async () => {
    if (isSubmitting) return; 

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        // Menggunakan r18 sebagai payload (r18 = Dewasa/Comment Enabled)
        body: JSON.stringify({ chosenGenre: selectedGenres, r18 }), 
      });

      const data = await res.json();
      console.log('Hasil submit:', data);

      if (data.status === 'success') {
        // Tutup dialog setelah berhasil
        setIsOpen(false);
        setTimeout(() => setShowDialog(false), 400);
      } else {
        alert('Gagal menyimpan pengaturan. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Gagal menyimpan pengaturan:', err);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setIsSubmitting(false);
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

          {/* Dialog Container */}
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
            {/* Dialog Content (Menerima Shake) */}
            <motion.div
              layout
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ 
                x: { duration: 0.4, ease: 'easeInOut' },
                layout: { duration: 0.4, ease: 'easeInOut' } 
              }}
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

                  {/* Step 2: Comment Feature (R18) */}
                  <div className="w-1/2 flex-shrink-0 flex flex-col items-center justify-center gap-6">
                    <div className="flex flex-col gap-4 w-full">
                      <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                        Fitur komentar Dewasa memungkinkan kamu berinteraksi dengan pembaca lain dalam diskusi terbuka.
                      </p>
                      <div className="flex justify-center gap-6">
                        <button
                          onClick={() => setR18(true)} 
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:cursor-pointer
                            ${
                              r18 === true
                                ? 'bg-[var(--accent-color)] text-white'
                                : 'border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-[var(--accent-color)]'
                            }`}
                        >
                          Iya
                        </button>
                        <button
                          // Menggunakan setR18(false)
                          onClick={() => setR18(false)} 
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:cursor-pointer
                            ${
                              r18 === false
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
                    disabled={isSubmitting} // Disable saat submit
                    className="flex-1 py-4 hover:cursor-pointer text-base md:text-lg rounded-lg border border-gray-400 dark:border-gray-600 
                    text-gray-800 dark:text-gray-200 hover:border-[var(--accent-color)] transition-all duration-300"
                  >
                    Kembali
                  </button>
                )}
                <button
                  type="button"
                  disabled={
                    (step === 1 && selectedGenres.length === 0) ||
                    (step === 2 && r18 === null) ||
                    isSubmitting // Disable saat submit
                  }
                  onClick={handleContinue}
                  className={`${
                    step === 2 ? 'flex-1' : 'w-full'
                  } py-4 text-base md:text-lg rounded-lg text-white transition-all duration-300
                    ${
                      ((step === 1 && selectedGenres.length === 0) ||
                      (step === 2 && r18 === null) ||
                      isSubmitting)
                        ? 'bg-[var(--accent-color)]/70 opacity-50 cursor-not-allowed'
                        : 'bg-[var(--accent-color)] opacity-100 cursor-pointer'
                    }`}
                >
                  {isSubmitting 
                    ? 'Memproses...' 
                    : step === 1 
                      ? 'Lanjutkan' 
                      : 'Lanjutkan Membaca'
                  }
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}