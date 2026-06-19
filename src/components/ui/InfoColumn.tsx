"use client";

import { ReactNode } from 'react';

export interface InfoItem {
  title: string;       // e.g., role or degree name
  subtitle: string;    // e.g., company or institution
  badge: string;       // e.g., period or status
  highlights: string[];
}

interface InfoColumnProps {
  title: string;
  icon: ReactNode;
  items: InfoItem[];
  isSubtleBadge?: boolean;
}

export default function InfoColumn({ title, icon, items, isSubtleBadge = false }: InfoColumnProps) {
  return (
    <div className="space-y-6">
      <h4 className="font-serif text-lg font-bold text-on-surface flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </h4>

      <div className="space-y-8 pl-4 border-l border-border-subtle">
        {items.map((item, idx) => (
          <div key={idx} className="relative space-y-2">
            {/* Pulsing visual tracker dot */}
            <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-surface-slate ${
              isSubtleBadge ? 'bg-primary-container/60' : 'bg-primary-container'
            }`} />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h5 className="font-serif text-base font-semibold text-on-surface leading-tight">
                {item.title}
              </h5>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded max-w-fit ${
                isSubtleBadge 
                  ? 'text-text-muted bg-surface-charcoal' 
                  : 'text-primary-container bg-primary-container/10'
              }`}>
                {item.badge}
              </span>
            </div>

            <p className="text-text-muted text-xs font-semibold">{item.subtitle}</p>
            
            <ul className="space-y-1.5 pt-2">
              {item.highlights.map((h, hIdx) => (
                <li key={hIdx} className="text-xs sm:text-sm text-on-surface-variant flex items-start gap-2 leading-relaxed">
                  <span className="text-primary-container mt-1.5 flex-shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
