import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { FOCUS_SLIDES } from '../data/initialTasks';

export default function FocusCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = FOCUS_SLIDES.length;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const slide = FOCUS_SLIDES[activeSlide];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      className={`rounded-2xl bg-gradient-to-r ${slide.accent} text-white p-5 sm:p-6 shadow-sm transition-all duration-300`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{slide.badge}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold leading-snug">{slide.title}</h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">{slide.subtitle}</p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Focus Note Slides">
            {FOCUS_SLIDES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Go to Focus Note ${idx + 1}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === idx ? 'w-7 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Focus Note"
              className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Focus Note"
              className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
