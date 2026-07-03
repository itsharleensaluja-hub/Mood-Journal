import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../common/GlassCard';

export function AiReflectionButton() {
  const navigate = useNavigate();

  return (
    <GlassCard
      padding="md"
      variant="accent" color="plum"
      hoverable
      onClick={() => navigate('/reflection')}
      className="group"
      ariaLabel="Go to AI reflection"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">✨</span>
          <div>
            <h3 className="text-sm font-medium text-ink-900 dark:text-ink-100">AI Reflection</h3>
            <p className="text-xs text-ink-400 dark:text-ink-500">Get personalized insights about your day</p>
          </div>
        </div>
        <span className="text-xs text-plum-500 group-hover:translate-x-0.5 transition-transform duration-150">
          &rarr;
        </span>
      </div>
    </GlassCard>
  );
}
