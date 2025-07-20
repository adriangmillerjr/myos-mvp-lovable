import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot } from "lucide-react";

type Model = 'gpt-4o' | 'gpt-4' | 'gpt-3.5-turbo';

interface ModelSelectorProps {
  selectedModel: Model;
  onModelChange: (model: Model) => void;
  disabled?: boolean;
}

export function ModelSelector({ selectedModel, onModelChange, disabled }: ModelSelectorProps) {
  const models = [
    { value: 'gpt-4o', label: 'GPT-4o', description: 'Most capable model' },
    { value: 'gpt-4', label: 'GPT-4', description: 'High intelligence' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Fast and efficient' }
  ] as const;

  return (
    <div className="flex items-center gap-2">
      <Bot className="w-4 h-4 text-muted-foreground" />
      <Select value={selectedModel} onValueChange={(value) => onModelChange(value as Model)} disabled={disabled}>
        <SelectTrigger className="w-40 h-8 text-sm">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              <div className="flex flex-col">
                <span className="font-medium">{model.label}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}