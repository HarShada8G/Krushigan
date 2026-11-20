import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QAItem {
  keywords: string[];
  answerHi: string;
  answerMr: string;
  answerEn: string;
}

const AGRICULTURAL_KNOWLEDGE: QAItem[] = [
  {
    keywords: ['दाग', 'धब्बे', 'धब्बा', 'डाग', 'करपा', 'blight', 'spot', 'spots'],
    answerHi: "टमाटर या फसल पर छल्लेदार भूरे दाग अर्ली ब्लाइट (अगेती झुलसा) के लक्षण हो सकते हैं। तुरंत निचली रोगग्रस्त पत्तियों को तोड़कर खेत से दूर करें। 5% नीम तेल या ट्राइकोडर्मा का छिड़काव करें।",
    answerMr: "पानांवरील काळे-तपकिरी गोलाकार डाग करपा रोगाचे लक्षण असू शकतात. खालची बाधीत पाने खुडून नष्ट करा आणि ५% निंबोळी अर्क किंवा ट्रायकोडर्मा फवारणी करा.",
    answerEn: "Brown concentric spots usually indicate early blight fungus. Prune infected bottom leaves, avoid wet foliage, and spray bio-fungicide Trichoderma harzianum @ 5g/L."
  },
  {
    keywords: ['खतरा', 'धोका', 'मौसम', 'हवामान', 'risk', 'weather'],
    answerHi: "अकोला व विदर्भ क्षेत्र में आज 78% आर्द्रता है। उच्च नमी के कारण टमाटर व कपास में फफूंद जनित रोगों का खतरा अधिक है। खेत में जल निकासी सुनिश्चित करें।",
    answerMr: "आज हवेत दमटपणा ७८% पेक्षा जास्त आहे. जास्त ओलाव्यामुळे बुरशीजन्य रोगांचा प्रादुर्भाव वाढू शकतो. शेतात पाणी साचणार नाही याची काळजी घ्या.",
    answerEn: "Current humidity exceeds 78% in your district. High humidity elevates fungal spore germination. Ensure field trench drainage."
  },
  {
    keywords: ['उपाय', 'बचाव', 'इलाज', 'कीटनाशक', 'औषध', 'treatment', 'spray', 'cure'],
    answerHi: "रोग रोकथाम के लिए सबसे पहले जैविक उपाय अपनाएं। 15-20 पीले चिपचिपे कार्ड लगाएं और नीम तेल 3 मिली प्रति लीटर का छिड़काव करें। रासायनिक कीटनाशक केवल विशेषज्ञ की अनुमति से ही लें।",
    answerMr: "रोग नियंत्रणासाठी प्रथम जैविक उपाय करा. एकरी १५-२० पिवळे चिकट सापळे लावा आणि नीम तेल ३ मिली/लिटर फवारा. तज्ज्ञांच्या सल्ल्याशिवाय रासायनिक फवारणी टाळा.",
    answerEn: "Adopt integrated pest management first: deploy yellow sticky traps and spray cold-pressed neem oil @ 3ml/L. Consult an agronomist before synthetic chemicals."
  },
  {
    keywords: ['दशपर्णी', 'dashparni', 'जैविक', 'organic', 'neem', 'नीम'],
    answerHi: "दशपर्णी अर्क 10 स्थानीय कड़वे पत्तों (नीम, करंज, अरंडी, निर्गुंडी आदि) और गोमूत्र से बनता है। 25 मिली प्रति लीटर पानी में मिलाकर छिड़कने से सभी रस चूसक कीट नियंत्रित रहते हैं।",
    answerMr: "दशपर्णी अर्क कडू वनस्पतींच्या पानांपासून (कडुलिंब, करंज, निर्गुडी) व गोमूत्रापासून बनवला जातो. २५ मिली प्रति लिटर पाण्यात फवारल्यास मावा, तुडतुडे या रस शोषक किडींचा नायनाट होतो.",
    answerEn: "Dashparni Ark is an indigenous organic concoction of 10 botanical leaves and cow urine. Dilute 25-30 ml/L to repel all major sucking pests."
  }
];

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [textInput, setTextInput] = useState('');
  const [conversation, setConversation] = useState<Array<{ sender: 'farmer' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: language === 'mr'
        ? "नमस्कार! मी तुमचा कृषी मित्र आहे. पिकाबद्दल कोणताही प्रश्न बोला किंवा खाली टाईप करा."
        : language === 'en'
        ? "Hello! I am your AI Crop Assistant. Ask any question about your crop by voice or typing."
        : "नमस्ते! मैं आपका किसान मित्र सहायक हूँ। अपनी फसल से जुड़ा कोई भी सवाल बोलकर या लिखकर पूछें।"
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

  const handleUserQuery = (query: string) => {
    if (!query.trim()) return;

    const userText = query.trim();
    setTextInput('');

    // Append user question
    const updated = [...conversation, { sender: 'farmer' as const, text: userText }];
    setConversation(updated);

    // Intelligent Answer Resolution
    const lower = userText.toLowerCase();
    const matched = AGRICULTURAL_KNOWLEDGE.find(item =>
      item.keywords.some(kw => lower.includes(kw.toLowerCase()))
    );

    let answer = "";
    if (matched) {
      answer = language === 'mr' ? matched.answerMr : language === 'en' ? matched.answerEn : matched.answerHi;
    } else {
      answer = language === 'mr'
        ? "तुमच्या प्रश्नाची नोंद घेतली आहे. अचूक निदानासाठी 'पिकाचा फोटो घ्या' बटणावर क्लिक करून पानाचा फोटो तपासा किंवा KVK तज्ज्ञांचा सल्ला घ्या."
        : language === 'en'
        ? "Query noted. For exact visual diagnosis, please take a clear crop photo via the Scan screen or consult local KVK experts."
        : "आपके सवाल को दर्ज कर लिया गया है। सटीक पहचान के लिए 'फसल की फोटो लें' पर क्लिक करके पत्ते की फोटो जांचें या नजदीकी KVK विशेषज्ञ से संपर्क करें।";
    }

    setTimeout(() => {
      setConversation(prev => [...prev, { sender: 'assistant', text: answer }]);
      speak(answer);
    }, 400);
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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <Sparkles className="text-emerald-300 animate-pulse" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{t('voice_title')}</h3>
              <p className="text-xs text-emerald-200">
                {language === 'mr' ? 'मराठी / हिंदी / इंग्रजी सहाय्य' : 'हिंदी / मराठी / English'}
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
                <p className="leading-relaxed">{msg.text}</p>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => (isSpeaking ? stopSpeaking() : speak(msg.text))}
                    className="mt-2 flex items-center space-x-1 text-xs text-[#287A50] font-semibold hover:underline"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX size={14} className="text-red-500" />
                        <span className="text-red-600">आवाज़ रोकें</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} />
                        <span>{t('voice_speak_answer')}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

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
                    : 'bg-[#164B35] hover:bg-[#287A50] text-white hover:scale-105'
                }`}
                title={isListening ? 'Stop' : 'Speak'}
              >
                {isListening ? <MicOff size={28} /> : <Mic size={28} />}
                {isListening && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 ring-2 ring-white animate-pulse"></span>
                )}
              </button>
            ) : (
              <div className="text-xs text-center text-amber-700 bg-amber-50 p-2 rounded-lg">
                {t('voice_unsupported')}
              </div>
            )}
          </div>

          {/* Text input fallback */}
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
              placeholder={t('voice_fallback_placeholder')}
              className="flex-1 px-4 py-2 text-sm rounded-xl border border-[#DDE7DF] focus:outline-none focus:ring-2 focus:ring-[#287A50]"
            />
            <button
              type="submit"
              disabled={!textInput.trim()}
              className="p-2.5 bg-[#164B35] text-white rounded-xl hover:bg-[#287A50] disabled:opacity-40 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
