import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">IntelliScore AI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-primary">Documentation</a>
            <a href="#" className="transition-colors hover:text-primary">About</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Master Your <span className="text-primary">AI Responses</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Evaluate AI answers for accuracy, clarity, and completeness. Get instant feedback and improved versions powered by Google Gemini.
            </p>
          </div>

          <AnalysisDashboard />
        </div>
      </main>

      <footer className="border-t py-6 md:py-0 bg-white">
        <div className="container mx-auto px-4 h-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IntelliScore AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}