import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Headphones } from 'lucide-react';

interface AudioUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export const AudioUpload = ({ onFileSelect, isLoading }: AudioUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    const acceptedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/wave'];
    
    if (acceptedTypes.includes(file.type) || file.name.toLowerCase().endsWith('.mp3') || file.name.toLowerCase().endsWith('.wav')) {
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      alert('Please select a valid audio file (.mp3 or .wav)');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  return (
    <Card className="p-8 border-2 border-dashed border-border hover:border-neon-blue/50 transition-all duration-300">
      <div
        className={`text-center transition-all duration-300 ${
          isDragging ? 'scale-105 opacity-80' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-center mb-4">
          {selectedFile ? (
            <div className="p-4 rounded-full bg-neon-purple/20 text-neon-purple">
              <Headphones className="w-8 h-8" />
            </div>
          ) : (
            <div className="p-4 rounded-full bg-muted text-muted-foreground">
              <Upload className="w-8 h-8" />
            </div>
          )}
        </div>

        {selectedFile ? (
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">File Selected</h3>
            <p className="text-sm text-neon-purple font-medium">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleButtonClick}
              disabled={isLoading}
              className="mt-4"
            >
              Choose Different File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Upload Audio File</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your audio file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports MP3 and WAV files
            </p>
            <Button 
              variant="audio" 
              onClick={handleButtonClick}
              disabled={isLoading}
              className="mt-4"
            >
              Browse Files
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav,audio/mpeg,audio/wav"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </Card>
  );
};