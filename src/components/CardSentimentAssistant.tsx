import React, { useState } from 'react';
import { Sparkles, Heart, RefreshCw, Copy, Check } from 'lucide-react';

interface CardSentimentAssistantProps {
  flowerName: string;
  onApplyMessage: (message: string) => void;
  defaultOccasion?: string;
}

export const CardSentimentAssistant: React.FC<CardSentimentAssistantProps> = ({
  flowerName,
  onApplyMessage,
  defaultOccasion = 'Anniversary / Love',
}) => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState(defaultOccasion);
  const [tone, setTone] = useState('Romantic & Deeply Heartfelt');
  const [feelings, setFeelings] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    spanishAlternative?: string;
    meaning?: string;
    botanicalTip?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'english' | 'spanish'>('english');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/card-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: recipient || 'My Love',
          occasion,
          tone,
          feelings,
          flowerType: flowerName,
        }),
      });

      if (!res.ok) throw new Error('Failed to reach sentiment advisor');
      const data = await res.json();
      setResult(data);
    } catch {
      // Graceful fallback
      setResult({
        message: `Dearest ${recipient || 'Loved One'},\n\nEvery delicate petal in these flowers was chosen with deep affection to remind you how much you mean to me today and forever.\n\nWith all my heart,`,
        spanishAlternative: `Para mi querido/a ${recipient || 'amor'},\n\nCada flor de este arreglo lleva un pedacito de mi corazón para ti. Gracias por llenar mi vida de tanta luz.\n\nCon todo mi amor,`,
        meaning: 'Roses and freshly curated garden florals symbolize enduring tenderness, devoted love, and grateful hearts.',
        botanicalTip: 'Keep blooms in cool shade and replenish fresh water every two days.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAndApply = (text: string) => {
    onApplyMessage(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F8F5ED] border border-[#E9E0D4] rounded-md p-4 sm:p-5 mt-3 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#E9E0D4]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B3202D]" />
          <h4 className="font-serif text-base font-bold text-[#39251D]">
            Bespoke Card Sentiment Advisor
          </h4>
        </div>
        <span className="text-[11px] font-sans px-2 py-0.5 rounded-full bg-[#647653]/15 text-[#647653] font-medium">
          Thoughtful AI Craft
        </span>
      </div>

      <p className="text-xs text-[#795A47] mt-2 mb-4 leading-relaxed font-sans">
        Flowers communicate what words sometimes cannot. Describe who this is for, and our sentiment assistant will compose poetic card words and explain the floral meaning.
      </p>

      {!result ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#39251D] mb-1">
                Recipient Name / Relation
              </label>
              <input
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="e.g. Sofia, Mom, My Dearest Wife"
                className="w-full text-xs px-3 py-2 bg-white border border-[#E9E0D4] rounded-sm focus:outline-none focus:border-[#B3202D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#39251D] mb-1">
                Occasion
              </label>
              <select
                value={occasion}
                onChange={e => setOccasion(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#E9E0D4] rounded-sm focus:outline-none focus:border-[#B3202D]"
              >
                <option value="Anniversary / Love">Anniversary / Love</option>
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Just Because / Thinking of You">Just Because / Thinking of You</option>
                <option value="Thank You & Gratitude">Thank You & Gratitude</option>
                <option value="Quinceañera / Milestone">Quinceañera / Milestone</option>
                <option value="Sympathy & Comfort">Sympathy & Comfort</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#39251D] mb-1">
              Desired Emotional Tone
            </label>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-[#E9E0D4] rounded-sm focus:outline-none focus:border-[#B3202D]"
            >
              <option value="Romantic & Deeply Heartfelt">Romantic & Deeply Heartfelt</option>
              <option value="Warm, Grateful & Loving">Warm, Grateful & Loving</option>
              <option value="Joyous, Playful & Celebratory">Joyous, Playful & Celebratory</option>
              <option value="Reverent, Gentle & Solacing (Sympathy)">Reverent, Gentle & Solacing (Sympathy)</option>
              <option value="Poetic Spanish Traditional Tone">Traditional Mexican / Hispanic Warmth</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#39251D] mb-1">
              Special Memory or Words to Include (Optional)
            </label>
            <input
              type="text"
              value={feelings}
              onChange={e => setFeelings(e.target.value)}
              placeholder="e.g., Happy 10th anniversary, thank you for supporting my dreams"
              className="w-full text-xs px-3 py-2 bg-white border border-[#E9E0D4] rounded-sm focus:outline-none focus:border-[#B3202D]"
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGenerate}
            className="w-full py-2.5 px-4 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Refining Message with High Thinking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Craft Sentimental Card Message</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Language tabs */}
          <div className="flex border-b border-[#E9E0D4] gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('english')}
              className={`pb-1 text-xs font-semibold transition-colors ${
                activeTab === 'english'
                  ? 'border-b-2 border-[#B3202D] text-[#B3202D]'
                  : 'text-[#795A47]'
              }`}
            >
              English Message
            </button>
            {result.spanishAlternative && (
              <button
                type="button"
                onClick={() => setActiveTab('spanish')}
                className={`pb-1 text-xs font-semibold transition-colors ${
                  activeTab === 'spanish'
                    ? 'border-b-2 border-[#B3202D] text-[#B3202D]'
                    : 'text-[#795A47]'
                }`}
              >
                Versión en Español
              </button>
            )}
          </div>

          {/* Message card */}
          <div className="p-3.5 bg-white border border-[#E9E0D4] rounded-sm relative">
            <p className="font-serif italic text-sm text-[#39251D] leading-relaxed whitespace-pre-line">
              {activeTab === 'english' ? result.message : result.spanishAlternative}
            </p>
          </div>

          {/* Symbolism */}
          {result.meaning && (
            <div className="bg-[#E9E0D4]/40 p-2.5 rounded-xs text-[11px] text-[#795A47] flex items-start gap-2">
              <Heart className="w-3.5 h-3.5 text-[#B3202D] shrink-0 mt-0.5" />
              <span>
                <strong>Floral Symbolism:</strong> {result.meaning}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() =>
                handleCopyAndApply(activeTab === 'english' ? result.message : result.spanishAlternative || result.message)
              }
              className="py-1.5 px-3 bg-[#B3202D] text-white text-xs font-semibold rounded-sm hover:bg-[#971a25] transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Applied to Gift Card!' : 'Use This Message on Card'}</span>
            </button>

            <button
              type="button"
              onClick={() => setResult(null)}
              className="py-1.5 px-3 border border-[#795A47]/40 text-[#39251D] text-xs font-medium rounded-sm hover:bg-[#E9E0D4]/50 transition-colors"
            >
              Try Another Idea
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
