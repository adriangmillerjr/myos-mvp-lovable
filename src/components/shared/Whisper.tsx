'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Whisper({
  onFinalTranscript,
  autoSubmit = false,
}: {
  onFinalTranscript: (text: string) => void;
  autoSubmit?: boolean;
}) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            onFinalTranscript(transcript);
            if (autoSubmit) setTimeout(() => onFinalTranscript(transcript), 100);
          } else {
            interim += transcript;
          }
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = () => stopListening();
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
    setInterimTranscript('');
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  if (!isSupported) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={toggleListening}
        className={`rounded-full p-2 ${isListening ? 'bg-red-100 text-red-500' : ''}`}
      >
        {isListening ? <MicOff /> : <Mic />}
      </Button>
      {interimTranscript && (
        <span className="text-sm text-muted-foreground italic">{interimTranscript}</span>
      )}
    </div>
  );
}
