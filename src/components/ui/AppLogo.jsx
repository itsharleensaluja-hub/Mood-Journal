import { HandwrittenText } from '../archive/HandwrittenText';

const sizes = {
  xs: { w: 16, h: 20, stroke: 1.5, gap: 3 },
  sm: { w: 24, h: 30, stroke: 2, gap: 5 },
  md: { w: 40, h: 50, stroke: 3, gap: 8 },
  lg: { w: 80, h: 100, stroke: 6, gap: 16 },
  xl: { w: 120, h: 150, stroke: 9, gap: 24 },
};

function FramePaths({ dim }) {
  const { w, h, stroke, gap } = dim;
  const m = stroke / 2;
  const right = w - m;
  const bottom = h - m;
  const rightStop = bottom - gap;
  const bottomStop = right - gap;

  return (
    <path
      d={`M ${m} ${m} L ${right} ${m} L ${right} ${rightStop} M ${bottomStop} ${bottom} L ${m} ${bottom} L ${m} ${m}`}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      strokeLinejoin="round"
      fill="none"
    />
  );
}

function SolidFrame({ dim }) {
  const { w, h, stroke, gap } = dim;
  const m = stroke / 2;
  const right = w - m;
  const bottom = h - m;
  const rightStop = bottom - gap;
  const bottomStop = right - gap;

  return (
    <path
      d={`M ${m} ${m} L ${right} ${m} L ${right} ${rightStop} L ${bottomStop} ${bottom} L ${m} ${bottom} Z`}
      fill="currentColor"
    />
  );
}

function LogoSvg({ type, dim, className }) {
  const svgProps = {
    viewBox: `0 0 ${dim.w} ${dim.h}`,
    width: dim.w,
    height: dim.h,
    'aria-hidden': 'true',
    className,
  };
  if (type === 'solid') {
    return <svg {...svgProps}><SolidFrame dim={dim} /></svg>;
  }
  return <svg {...svgProps}><FramePaths dim={dim} /></svg>;
}

const textSize = { xs: 'xs', sm: 'sm', md: 'base', lg: 'lg', xl: 'xl' };

export function AppLogo({ variant = 'symbol', size = 'md', className = '' }) {
  const dim = sizes[size] || sizes.md;

  if (variant === 'horizontal') {
    return (
      <span className={`inline-flex items-center gap-2.5 text-ink-800 dark:text-ink-100 ${className}`}>
        <LogoSvg type="frame" dim={dim} className="shrink-0" />
        <HandwrittenText size={textSize[size]} className="leading-none mt-0.5">
          MindPulse
        </HandwrittenText>
      </span>
    );
  }

  if (variant === 'vertical') {
    return (
      <span className={`inline-flex flex-col items-center gap-1.5 text-ink-800 dark:text-ink-100 ${className}`}>
        <LogoSvg type="frame" dim={dim} className="shrink-0" />
        <HandwrittenText size={size === 'xl' ? 'lg' : 'sm'} className="leading-none">
          MindPulse
        </HandwrittenText>
      </span>
    );
  }

  if (variant === 'solid') {
    return <LogoSvg type="solid" dim={dim} className={className} />;
  }

  return <LogoSvg type="frame" dim={dim} className={className} />;
}
