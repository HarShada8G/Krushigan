import { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from '../types';

interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasSupport: boolean;
  error: string | null;
  resetTranscript: () => void;
}

export const useSpeechRecognition = (language: Language = 'hi'): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSupport, setHasSupport] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setHasSupport(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Map language
      const langMap: Record<Language, string> = {
        hi: 'hi-IN',
        mr: 'mr-IN',
        en: 'en-IN'
      };
      recognition.lang = langMap[language] || 'hi-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('माइक की अनुमति नहीं मिली (Microphone permission denied)');
        } else if (event.error === 'no-speech') {
          // ignore or set soft message
        } else {
          setError(`आवाज़ पहचान में त्रुटि (${event.error})`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setHasSupport(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [language]);

  const startListening = useCallback(() => {
    if (!hasSupport) {
      setError('इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है (Speech recognition unsupported)');
      return;
    }
    setError(null);
    setTranscript('');
    try {
      recognitionRef.current?.start();
    } catch (e) {
      console.warn('Failed to start speech recognition:', e);
    }
  }, [hasSupport]);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch (e) {
      // ignore
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    hasSupport,
    error,
    resetTranscript
  };
};
