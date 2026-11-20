import { useState, useCallback, useEffect } from 'react';
import { Language } from '../types';

interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  hasSupport: boolean;
}

export const useSpeechSynthesis = (language: Language = 'hi'): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [hasSupport, setHasSupport] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasSupport(true);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!hasSupport || !text) return;

      window.speechSynthesis.cancel(); // Stop any previous speech

      const utterance = new SpeechSynthesisUtterance(text);
      
      const langMap: Record<Language, string> = {
        hi: 'hi-IN',
        mr: 'mr-IN',
        en: 'en-IN'
      };
      utterance.lang = langMap[language] || 'hi-IN';
      utterance.rate = 0.9; // Slightly slower for clear rural understanding
      utterance.pitch = 1.0;

      // Select matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [hasSupport, language]
  );

  const stop = useCallback(() => {
    if (hasSupport) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [hasSupport]);

  return {
    speak,
    stop,
    isSpeaking,
    hasSupport
  };
};
