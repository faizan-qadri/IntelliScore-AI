"use client";

import { useState } from "react";
import { AnalysisForm } from "./AnalysisForm";
import { AnalysisResults } from "./AnalysisResults";
import { AnalyzeAnswerScoresExplanationOutput } from "@/ai/flows/analyze-answer-scores-explanation-flow";
import { analyzeAnswerForScoresAndExplanation } from "@/ai/flows/analyze-answer-scores-explanation-flow";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function AnalysisDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalyzeAnswerScoresExplanationOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (question: string, aiAnswer: string) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const output = await analyzeAnswerForScoresAndExplanation({
        question,
        aiAnswer,
      });
      setResult(output);
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error communicating with the AI. Please try again later.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setResult(null);
  };

  return (
    <div className="grid gap-8">
      <div className={result ? "grid lg:grid-cols-2 gap-8 items-start" : "max-w-3xl mx-auto w-full"}>
        <section className="space-y-6">
          <AnalysisForm 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
            onClear={handleClear}
          />
        </section>

        {isAnalyzing && !result && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-white/50 border border-dashed rounded-xl animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-muted-foreground">Analyzing response quality...</p>
          </div>
        )}

        {result && (
          <section className="animate-in slide-in-from-right-10 fade-in duration-500">
            <AnalysisResults result={result} />
          </section>
        )}
      </div>
      <Toaster />
    </div>
  );
}