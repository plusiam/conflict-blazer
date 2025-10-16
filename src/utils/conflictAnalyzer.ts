// 갈등 온도계 유틸리티 함수들

export const getIntensityColor = (intensity: number): string => {
  if (intensity <= 3) return 'hsl(var(--thermometer-cold))';
  if (intensity <= 6) return 'hsl(var(--thermometer-warm))';
  return 'hsl(var(--thermometer-hot))';
};

export const getIntensityLabel = (intensity: number): string => {
  if (intensity <= 3) return '낮은 갈등';
  if (intensity <= 6) return '중간 갈등';
  if (intensity <= 8) return '높은 갈등';
  return '매우 높은 갈등';
};
