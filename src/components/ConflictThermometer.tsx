import { useEffect, useState } from 'react';
import { getIntensityColor } from '@/utils/conflictAnalyzer';

interface ConflictThermometerProps {
  intensity: number;
}

export const ConflictThermometer = ({ intensity }: ConflictThermometerProps) => {
  const [animatedHeight, setAnimatedHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHeight(intensity * 10);
    }, 100);
    return () => clearTimeout(timer);
  }, [intensity]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-80 w-24 rounded-full bg-muted border-4 border-border overflow-hidden">
        {/* 눈금 표시 */}
        <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
            <div key={num} className="flex items-center justify-end pr-2">
              <span className="text-xs font-medium text-muted-foreground">{num}</span>
            </div>
          ))}
        </div>

        {/* 온도계 채우기 */}
        <div 
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out rounded-b-full"
          style={{ 
            height: `${animatedHeight}%`,
            backgroundColor: getIntensityColor(intensity)
          }}
        />
      </div>

      {/* 온도계 하단 구 */}
      <div 
        className="w-20 h-20 rounded-full border-4 border-border transition-all duration-1000"
        style={{ 
          backgroundColor: animatedHeight > 0 ? getIntensityColor(intensity) : 'hsl(var(--muted))'
        }}
      />

      {/* 강도 레이블 */}
      <div className="text-center">
        <div className="text-4xl font-bold" style={{ color: getIntensityColor(intensity) }}>
          {intensity}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          갈등 강도
        </div>
      </div>
    </div>
  );
};
