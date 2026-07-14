import { MessageSquare } from "lucide-react";

interface IntegratedAIAssistantProps {
  onLaunchChat: () => void;
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
}

export default function IntegratedAIAssistant({
  onLaunchChat,
  label,
  title,
  description,
  buttonLabel,
}: IntegratedAIAssistantProps) {
  return (
    <div className="bg-gradient-to-br from-surface-slate to-surface-charcoal border border-primary-container/30 p-6 rounded-lg relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-primary-container/5 rounded-lg blur-2xl" />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary-container uppercase tracking-widest font-mono">
            {label}
          </span>
        </div>
        <h4 className="font-serif text-lg font-bold text-on-surface">
          {title}
        </h4>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>

      <button
        id="launch-chat-widget-btn"
        onClick={onLaunchChat}
        className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-surface-slate border border-primary-container hover:bg-primary-container hover:text-on-primary rounded-lg text-xs font-bold transition-all text-primary-container cursor-pointer"
      >
        <MessageSquare className="w-4 h-4" />
        {buttonLabel}
      </button>
    </div>
  );
}
