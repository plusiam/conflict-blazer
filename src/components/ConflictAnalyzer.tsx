import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ConflictThermometer } from './ConflictThermometer';
import { getIntensityLabel, getIntensityColor } from '@/utils/conflictAnalyzer';
import { Download, RotateCcw, CalendarIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const ConflictAnalyzer = () => {
  const [step, setStep] = useState<'setup' | 'input' | 'intensity' | 'reflection' | 'result'>('setup');
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date>();
  const [situation, setSituation] = useState('');
  const [intensity, setIntensity] = useState([5]);
  const [reflection, setReflection] = useState('');

  const handleNext = () => {
    if (step === 'setup') {
      if (!name.trim()) {
        toast.error('이름을 입력해주세요');
        return;
      }
      setStep('input');
    } else if (step === 'input') {
      if (!situation.trim()) {
        toast.error('갈등 상황을 입력해주세요');
        return;
      }
      setStep('intensity');
    } else if (step === 'intensity') {
      setStep('reflection');
    } else if (step === 'reflection') {
      if (!reflection.trim()) {
        toast.error('성찰 내용을 입력해주세요');
        return;
      }
      setStep('result');
    }
  };

  const handleReset = () => {
    setStep('setup');
    setName('');
    setDate(undefined);
    setSituation('');
    setIntensity([5]);
    setReflection('');
    toast.success('초기화되었습니다');
  };

  const handleSave = async () => {
    const element = document.getElementById('final-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const link = document.createElement('a');
      const dateStr = date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
      link.download = `갈등온도계_${name}_${dateStr}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success('이미지가 저장되었습니다');
    } catch (error) {
      toast.error('이미지 저장에 실패했습니다');
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">갈등 온도계</h1>
        <p className="text-muted-foreground">
          나의 갈등 상황을 돌아보고 성찰해봅시다
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 'setup' && '시작하기'}
              {step === 'input' && '1단계: 갈등 상황'}
              {step === 'intensity' && '2단계: 갈등 강도'}
              {step === 'reflection' && '3단계: 성찰하기'}
              {step === 'result' && '완료!'}
            </CardTitle>
            <CardDescription>
              {step === 'setup' && '기본 정보를 입력해주세요'}
              {step === 'input' && '겪은 갈등 상황을 자세히 적어주세요'}
              {step === 'intensity' && '이 갈등이 나에게 어느 정도였나요?'}
              {step === 'reflection' && '왜 그렇게 느꼈는지 생각해보세요'}
              {step === 'result' && '나의 갈등을 돌아보았습니다'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'setup' && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>날짜 (선택사항)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "yyyy년 MM월 dd일") : "날짜 선택"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button onClick={handleNext} className="w-full" size="lg">
                  시작하기
                </Button>
              </>
            )}

            {step === 'input' && (
              <>
                <Textarea
                  placeholder="예: 오늘 친구가 급식 줄에 새치기를 했어요..."
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
                <Button onClick={handleNext} className="w-full" size="lg">
                  다음 단계로
                </Button>
              </>
            )}

            {step === 'intensity' && (
              <>
                <div className="space-y-6 py-4">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2" style={{ 
                      color: getIntensityColor(intensity[0]) 
                    }}>
                      {intensity[0]}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getIntensityLabel(intensity[0])}
                    </div>
                  </div>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 (낮음)</span>
                    <span>10 (매우 높음)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setStep('setup')} 
                    variant="outline"
                    className="flex-1"
                  >
                    이전
                  </Button>
                  <Button onClick={handleNext} className="flex-1" size="lg">
                    다음 단계로
                  </Button>
                </div>
              </>
            )}

            {step === 'reflection' && (
              <>
                <Textarea
                  placeholder="왜 이 정도의 강도로 느꼈나요? 어떤 생각과 감정이 들었나요?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setStep('intensity')} 
                    variant="outline"
                    className="flex-1"
                  >
                    이전
                  </Button>
                  <Button onClick={handleNext} className="flex-1" size="lg">
                    완료하기
                  </Button>
                </div>
              </>
            )}

            {step === 'result' && (
              <>
                <div className="space-y-4">
                  <div className="text-sm space-y-3 bg-muted/50 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold text-xs text-muted-foreground mb-1">작성자</p>
                      <p className="font-medium">{name}</p>
                    </div>
                    {date && (
                      <div>
                        <p className="font-semibold text-xs text-muted-foreground mb-1">날짜</p>
                        <p className="font-medium">{format(date, "yyyy년 MM월 dd일")}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleSave}
                    className="w-full"
                    size="lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    결과 이미지 저장
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    새로 시작하기
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {step === 'result' ? (
          <div id="final-result" className="bg-card rounded-lg border shadow-sm p-8 space-y-6">
            <div className="text-center border-b pb-4">
              <h2 className="text-3xl font-bold mb-2">갈등 온도계 결과</h2>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium">{name}</span>
                {date && <span>•</span>}
                {date && <span>{format(date, "yyyy년 MM월 dd일")}</span>}
              </div>
            </div>

            <div className="flex justify-center">
              <ConflictThermometer intensity={intensity[0]} />
            </div>

            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">📝</span>
                  갈등 상황
                </h3>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{situation}</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">💭</span>
                  나의 성찰
                </h3>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{reflection}</p>
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                갈등 온도계 • 자기 성찰 도구
              </p>
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>나의 갈등 온도계</CardTitle>
              <CardDescription>
                {step === 'setup' && '기본 정보를 입력해주세요'}
                {step === 'input' && '갈등 상황을 입력해주세요'}
                {step === 'intensity' && getIntensityLabel(intensity[0])}
                {step === 'reflection' && getIntensityLabel(intensity[0])}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {step === 'setup' || step === 'input' ? (
                <div className="text-center text-muted-foreground py-16">
                  단계별로 진행해주세요
                </div>
              ) : (
                <ConflictThermometer intensity={intensity[0]} />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
