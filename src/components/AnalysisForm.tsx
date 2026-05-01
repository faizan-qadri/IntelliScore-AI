"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Eraser, AlertCircle } from "lucide-react";

interface AnalysisFormProps {
  onAnalyze: (question: string, answer: string) => Promise<void>;
  isAnalyzing: boolean;
  onClear: () => void;
}

export function AnalysisForm({ onAnalyze, isAnalyzing, onClear }: AnalysisFormProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!question.trim()) {
      setError("Please provide the original question.");
      return;
    }

    if (!answer.trim()) {
      setError("Please provide the AI-generated answer to analyze.");
      return;
    }

    await onAnalyze(question, answer);
  };

  const handleClear = () => {
    setQuestion("");
    setAnswer("");
    setError(null);
    onClear();
  };

  const isEmpty = !question.trim() || !answer.trim();

  return (
    <Card className="shadow-xl border-t-4 border-t-primary overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          Input for Analysis
        </CardTitle>
        <CardDescription>
          Provide the context for the AI response you want to evaluate.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Original Question
            </Label>
            <Textarea
              id="question"
              placeholder="e.g., What are the main causes of climate change?"
              className="min-h-[100px] resize-none focus:ring-primary"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              AI-Generated Answer
            </Label>
            <Textarea
              id="answer"
              placeholder="Paste the response you want to analyze here..."
              className="min-h-[180px] resize-none focus:ring-primary"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={isAnalyzing || (question === "" && answer === "")}
            className="flex-1 border-input hover:bg-muted"
          >
            <Eraser className="w-4 h-4 mr-2" />
            Clear All
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg"
            disabled={isAnalyzing || isEmpty}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Analyze Now
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}