import { useNavigate } from 'react-router-dom';
import { ArtifactCard } from '../archive/ArtifactCard';
import { HandwrittenText } from '../archive/HandwrittenText';

export function MarginaliaInsight() {
  const navigate = useNavigate();

  return (
    <ArtifactCard
      variant="tipped"
      hoverable
      onClick={() => navigate('/reflection')}
      className="group"
      ariaLabel="Go to AI reflection"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg text-brass-400">✦</span>
          <div>
            <HandwrittenText as="h3" size="base" className="text-ink-800 dark:text-ink-200">
              Marginalia
            </HandwrittenText>
            <HandwrittenText size="xs" color="ink-500">
              Quiet insights in the margins
            </HandwrittenText>
          </div>
        </div>
        <span className="handwriting text-sm text-brass-400 group-hover:translate-x-0.5 transition-transform duration-150">
          open
        </span>
      </div>
    </ArtifactCard>
  );
}
