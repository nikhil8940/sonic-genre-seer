import { Card } from '@/components/ui/card';
import { Music } from 'lucide-react';

interface ClassificationResult {
  genre: string;
  confidence: number;
}

interface ClassificationResultsProps {
  result: ClassificationResult | null;
  isLoading: boolean;
}

export const ClassificationResults = ({ result, isLoading }: ClassificationResultsProps) => {
  if (isLoading) {
    return (
      <Card className="p-8 border border-neon-blue/30">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-pulse-glow p-4 rounded-full bg-neon-purple/20">
              <Music className="w-8 h-8 text-neon-purple animate-wave" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-foreground">Analyzing Audio...</h3>
          <p className="text-sm text-muted-foreground">
            Our AI is identifying the musical genre
          </p>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-8 bg-gradient-waveform rounded-full animate-wave"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="p-8 border border-border/50">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-muted text-muted-foreground">
              <Music className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-muted-foreground">Ready to Classify</h3>
          <p className="text-sm text-muted-foreground">
            Upload an audio file and click classify to see results
          </p>
        </div>
      </Card>
    );
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-neon-green';
    if (confidence >= 0.6) return 'text-neon-blue';
    return 'text-neon-purple';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High Confidence';
    if (confidence >= 0.6) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <Card className="p-8 border border-neon-purple/30 bg-card/50 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-neon-purple/20 text-neon-purple shadow-glow-neon">
            <Music className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Classification Results</h3>
          
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Predicted Genre</p>
              <p className="text-3xl font-bold text-neon-purple">{result.genre}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Confidence Score</p>
              <div className="space-y-2">
                <p className={`text-2xl font-bold ${getConfidenceColor(result.confidence)}`}>
                  {Math.round(result.confidence * 100)}%
                </p>
                <p className={`text-sm ${getConfidenceColor(result.confidence)}`}>
                  {getConfidenceLabel(result.confidence)}
                </p>
              </div>
            </div>

            {/* Confidence bar */}
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-audio transition-all duration-1000 ease-out"
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};