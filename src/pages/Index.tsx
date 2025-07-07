import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AudioUpload } from '@/components/AudioUpload';
import { ClassificationResults } from '@/components/ClassificationResults';
import { AudioPlayer } from '@/components/AudioPlayer';
import { useToast } from '@/hooks/use-toast';

interface ClassificationResult {
  genre: string;
  confidence: number;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null); // Clear previous results
  };

  const handleClassify = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload an audio file first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI classification (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock result - replace with actual API response
    const mockGenres = ['Rock', 'Jazz', 'Classical', 'Pop', 'Hip Hop', 'Electronic', 'Blues', 'Country'];
    const randomGenre = mockGenres[Math.floor(Math.random() * mockGenres.length)];
    const confidence = 0.6 + Math.random() * 0.4; // Random confidence between 0.6-1.0
    
    setResult({
      genre: randomGenre,
      confidence: confidence
    });
    
    setIsLoading(false);
    
    toast({
      title: "Classification Complete!",
      description: `Detected genre: ${randomGenre} (${Math.round(confidence * 100)}% confidence)`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-glow fixed inset-0 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-audio bg-clip-text text-transparent mb-4">
            Music Genre Classifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your audio file and let our AI identify the musical genre with advanced machine learning
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upload Section */}
          <AudioUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

          {/* Audio Player */}
          {selectedFile && (
            <AudioPlayer file={selectedFile} />
          )}

          {/* Classify Button */}
          {selectedFile && (
            <div className="text-center">
              <Button
                variant="neon"
                size="lg"
                onClick={handleClassify}
                disabled={isLoading}
                className="text-lg px-8 py-6 rounded-xl"
              >
                {isLoading ? 'Classifying...' : 'Classify Genre'}
              </Button>
            </div>
          )}

          {/* Results Section */}
          <ClassificationResults result={result} isLoading={isLoading} />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Powered by advanced AI • Supports MP3 and WAV formats
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
