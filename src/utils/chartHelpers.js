import { getMoodColor } from '../data/moods';

export function getMoodChartColor(moodId, alpha = 1) {
  const color = getMoodColor(moodId);
  return hexToRgba(color, alpha);
}

export function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getDefaultChartOptions(isDark = false) {
  const textColor = isDark ? '#EDE9FE' : '#57534E';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor, font: { family: 'Inter' } },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)',
        titleColor: isDark ? '#EDE9FE' : '#1C1917',
        bodyColor: isDark ? '#A1A1AA' : '#57534E',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        boxPadding: 4,
        usePointStyle: true,
        titleFont: { family: 'Inter', weight: '600' },
        bodyFont: { family: 'Inter' },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: textColor, font: { family: 'Inter' } },
      },
      y: {
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: textColor, font: { family: 'Inter' } },
      },
    },
  };
}

export function getDoughnutOptions(isDark = false) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#EDE9FE' : '#57534E',
          padding: 16,
          font: { family: 'Inter', size: 12 },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)',
        titleColor: isDark ? '#EDE9FE' : '#1C1917',
        bodyColor: isDark ? '#A1A1AA' : '#57534E',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = ((ctx.parsed / total) * 100).toFixed(0);
            return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
          },
        },
      },
    },
  };
}

export function getHeatmapOptions(isDark = false) {
  const textColor = isDark ? '#EDE9FE' : '#57534E';
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)',
        titleColor: isDark ? '#EDE9FE' : '#1C1917',
        bodyColor: isDark ? '#A1A1AA' : '#57534E',
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { family: 'Inter', size: 10 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: textColor, font: { family: 'Inter', size: 10 } },
      },
    },
  };
}
