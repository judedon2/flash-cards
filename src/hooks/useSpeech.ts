/// <reference types="vite/client" />
import { useCallback, useRef } from 'react';

/**
 * Custom hook for Brazilian Portuguese text-to-speech using Google Translate
 * Via local proxy server to bypass CORS restrictions
 */
export function useSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Speak text in Brazilian Portuguese using Google Translate TTS via proxy
   * @param text - The text to speak
   * @param isMale - Whether to use male voice (true) or female voice (false)
   */
  const speak = useCallback((text: string, isMale: boolean = false) => {
    if (!text) return;

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Use proxy server to get Google Translate audio
    // In development: use localhost:3001/tts, in production: use Vercel serverless function /api/tts
    const encodedText = encodeURIComponent(text);
    const gender = isMale ? 'male' : 'female';
    const endpoint = import.meta.env.DEV ? 'http://localhost:3001/tts' : '/api/tts';
    const proxyUrl = `${endpoint}?text=${encodedText}&gender=${gender}`;

    console.log(`Playing Google Translate TTS (${gender} voice):`, text);

    // Create and play audio
    const audio = new Audio(proxyUrl);
    audioRef.current = audio;

    audio.play().catch((error) => {
      console.error('Error playing Google TTS audio:', error);
      if (import.meta.env.DEV) {
        console.log('Make sure the proxy server is running (npm run start)');
      }
    });
  }, []);

  /**
   * Stop any ongoing speech
   */
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  return { speak, stop, isSupported: true };
}
