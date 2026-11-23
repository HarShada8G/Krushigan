import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Send, Sparkles, Bot, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { chatWithAiAssistant } from '../../services/api';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'farmer' | 'assistant';
  text: string;
  isRealAI?: boolean;
  isOfflineDemo?: boolean;
  modelUsed?: string;
  disclaimer?: string;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const { farmerProfile } = useAuth();
  const [textInput, setTextInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: language === 'mr'
        ? "नमस्कार! मी तुमचा कृषी मित्र AI सहाय्यक आहे. पिकाबद्दल कोणताही प्रश्न बोला किंवा खाली टाईप करा."
        : language === 'en'
        ? "Hello! I am your Krushigan AI Assistant. Ask any question about your crop by voice or typing."
        : "नमस्ते! मैं आपका कृषिगण AI सहायक हूँ। अपनी फसल से जुड़ा कोई भी सवाल बोलकर या लिखकर पूछें।",
      isOfflineDemo: false
    }
  ]);

  const { transcript, isListening, startListening, stopListening, hasSupport, error, resetTranscript } =
    useSpeechRecognition(language);

  const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis(language);

  useEffect(() => {
    if (transcript && !isListening) {
      handleUserQuery(transcript);
      resetTranscript();
    }
  }, [isListening, transcript]);

  const handleUserQuery = async (query: string) => {
    if (!query.trim()) return;

    const userText = query.trim();
    setTextInput('');

    // Append user question
    setConversation(prev => [...prev, { sender: 'farmer', text: userText }]);
    setIsAiThinking(true);

    try {
      const res = await chatWithAiAssistant(userText, language, {
        crop: farmerProfile?.currentCrop,
        district: farmerProfile?.district,
        growth_stage: farmerProfile?.growthStage
      });

      setConversation(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: res.answer,
          isRealAI: res.isRealAI,
          isOfflineDemo: res.isOfflineDemo,
          modelUsed: res.modelUsed,
          disclaimer: res.disclaimer
        }
      ]);
      speak(res.answer);
    } catch (e) {
      const fallbackText =
        language === 'mr'
          ? "माहिती मिळवण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा."
          : language === 'en'
          ? "Could not retrieve response. Please try again."
          : "जानकारी प्राप्त करने में कठिनाई हुई। कृपया पुनः प्रयास करें।";
      setConversation(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: fallbackText,
          isOfflineDemo: true
        }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleSampleClick = (sample: string) => {
    handleUserQuery(sample);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F8F7F0] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-[#164B35]/20 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-[#164B35] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400/40">
              <Bot size={20} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight flex items-center space-x-1.5">
                <span>{t('voice_title')}</span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  AI v2.0
                </span>
              </h3>
              <p className="text-xs text-emerald-200">
                {language === 'mr' ? 'मराठी / हिंदी / इंग्रजी सहाय्य' : language === 'en' ? 'English / Hindi / Marathi Support' : 'हिंदी / मराठी / English'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              stopListening();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === 'farmer' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.sender === 'farmer'
                    ? 'bg-[#164B35] text-white rounded-br-none shadow-sm'
                    : 'bg-white text-[#202D25] border border-[#DDE7DF] rounded-bl-none shadow-sm'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                {msg.sender === 'assistant' && (
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-1 text-[11px]">
                    <div className="flex items-center space-x-1.5">
                      {msg.isRealAI ? (
                        <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                          <Sparkles size={11} />
                          <span>Gemini AI</span>
                        </span>
                      ) : msg.isOfflineDemo ? (
                        <span className="inline-flex items-center space-x-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                          <span>📴 ऑफलाइन ज्ञानकोष</span>
                        </span>
                      ) : null}
                    </div>

                    <button
                      onClick={() => (isSpeaking ? stopSpeaking() : speak(msg.text))}
                      className="flex items-center space-x-1 text-[#287A50] font-semibold hover:underline"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX size={13} className="text-red-500" />
                          <span className="text-red-600">आवाज़ रोकें</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={13} />
                          <span>{t('voice_speak_answer')}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {msg.disclaimer && (
                  <p className="text-[10px] text-gray-500 mt-1 italic">
                    {msg.disclaimer}
                  </p>
                )}
              </div>
            </div>
          ))}

          {isAiThinking && (
            <div className="flex items-center space-x-2 text-xs text-[#164B35] bg-white border border-[#DDE7DF] px-3.5 py-2.5 rounded-2xl w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#287A50] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#287A50] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#287A50] animate-bounce [animation-delay:0.4s]"></span>
              <span className="font-semibold text-xs ml-1">
                {language === 'mr' ? 'एआय विचार करत आहे...' : language === 'en' ? 'AI is thinking...' : 'एआई जवाब तैयार कर रहा है...'}
              </span>
            </div>
          )}

          {isListening && (
            <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-semibold">{t('voice_listening')}</span>
              {transcript && <span className="italic text-gray-700">"{transcript}"</span>}
            </div>
          )}

          {error && (
            <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Sample queries */}
        <div className="px-4 py-2 bg-white/60 border-t border-b border-[#DDE7DF]">
          <p className="text-[11px] font-semibold text-[#5F6F65] mb-1.5">{t('voice_prompt')}</p>
          <div className="flex flex-wrap gap-1.5">
            {[t('voice_sample_1'), t('voice_sample_2'), t('voice_sample_3')].map((sample, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className="text-xs bg-white text-[#164B35] border border-[#287A50]/30 px-2.5 py-1 rounded-full hover:bg-[#EAF4E9] transition-colors truncate max-w-full text-left"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Action / Input Footer */}
        <div className="p-4 bg-white flex flex-col space-y-3">
          {/* Large Microphone CTA */}
          <div className="flex justify-center">
            {hasSupport ? (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all shadow-touch ${
                  isListening
                    ? 'bg-[#D9534F] text-white scale-110 ring-8 ring-red-100'
                    : 'bg-[#164B35] hover:bg-[#287A50] text-white'
                }`}
                title={isListening ? "माइक बंद करें" : "बोलकर पूछें"}
              >
                {isListening ? (
                  <MicOff size={28} className="animate-pulse" />
                ) : (
                  <Mic size={28} className="text-emerald-300" />
                )}
              </button>
            ) : (
              <p className="text-xs text-amber-700 text-center">
                आपके ब्राउज़र में वॉइस सपोर्ट उपलब्ध नहीं है। नीचे टाइप करके पूछें।
              </p>
            )}
          </div>

          {/* Fallback Text Input */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleUserQuery(textInput);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              placeholder={
                language === 'mr'
                  ? 'पिकाबद्दल प्रश्न टाईप करा...'
                  : language === 'en'
                  ? 'Type question about crop...'
                  : 'फसल से जुड़ा सवाल यहाँ टाइप करें...'
              }
              className="flex-1 px-4 py-2.5 bg-[#F8F7F0] border border-[#DDE7DF] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#287A50]"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || isAiThinking}
              className="bg-[#164B35] hover:bg-[#287A50] disabled:opacity-40 text-white p-2.5 rounded-2xl transition-all shadow-sm"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
