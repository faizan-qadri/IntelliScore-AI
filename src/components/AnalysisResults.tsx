"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Sparkles, MessageSquare, ListChecks, Info } from "lucide-react";
import { AnalyzeAnswerScoresExplanationOutput } from "@/ai/flows/analyze-answer-scores-explanation-flow";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  result: AnalyzeAnswerScoresExplanationOutput;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-600";
    if (score >= 5) return "text-amber-600";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 8) return "bg-emerald-500";
    if (score >= 5) return "bg-amber-500";
    return "bg-destructive";
  };

  const scores = [
    { label: "Accuracy", value: result.accuracy, icon: CheckCircle2 },
    { label: "Clarity", value: result.clarity, icon: Info },
    { label: "Completeness", value: result.completeness, icon: ListChecks },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-none overflow-hidden">
        <CardHeader className="bg-primary/5 border-b pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Analysis Result
            </CardTitle>
            <Badge variant="secondary" className="px-3 py-1 font-semibold bg-accent text-accent-foreground">
              Evaluated by AI
            </Badge>
          </div>
          <CardDescription>
            Performance breakdown and qualitative feedback based on your input.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 space-y-8">
          <div className="grid gap-6">
            {scores.map((score) => (
              <div key={score.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <score.icon className="w-4 h-4" />
                    {score.label}
                  </span>
                  <span className={cn("font-bold text-lg", getScoreColor(score.value))}>
                    {score.value}/10
                  </span>
                </div>
                <div className="relative h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("absolute h-full transition-all duration-1000 ease-out rounded-full", getProgressColor(score.value))}
                    style={{ width: `${score.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <h4 className="text-lg font-bold flex items-center gap-2 text-foreground border-b pb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Detailed Explanation
            </h4>
            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
              {result.explanation.split('\n').map((para, i) => para.trim() && (
                <p key={i} className="mb-3">{para}</p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-none bg-secondary/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-secondary-foreground">
            <Sparkles className="w-5 h-5" />
            Improved Answer
          </CardTitle>
          <CardDescription>
            A refined version addressing the identified weaknesses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white/80 p-5 rounded-lg border border-secondary/50 shadow-inner">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {result.improvedAnswer}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => navigator.clipboard.writeText(result.improvedAnswer)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Copy to clipboard
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}