# **App Name**: IntelliScore AI

## Core Features:

- AI-Powered Response Analysis: Utilize the Google Gemini API to analyze user-provided questions and AI-generated answers, acting as a tool to score responses on accuracy, clarity, and completeness, and generating a detailed explanation along with an improved version of the answer.
- Secure API Handling: Establish a backend API endpoint using Next.js API Routes to securely communicate with the Google Gemini API, ensuring the API key is never exposed on the client-side.
- Question and Answer Input Interface: Provide a clean and responsive user interface with two distinct text areas for users to input their question and the AI-generated answer.
- Comprehensive Analysis Result Display: Render the analysis results in a clear and structured manner, showcasing the numerical accuracy, clarity, and completeness scores, the detailed explanation, and the suggested improved answer.
- Loading, Error, and Empty State Feedback: Implement robust UI feedback mechanisms including a loading indicator during analysis, user-friendly error messages for API failures or invalid inputs, and a clear disabled state for the analyze button until inputs are provided.
- Input Validation and Sanitization: Implement server-side input validation to prevent processing of empty or malicious inputs, sanitizing user data before passing it to the AI model to ensure security and reliability.
- Basic API Rate Limiting: Integrate basic rate-limiting middleware on the backend API endpoint to protect against abuse and ensure fair usage of resources.

## Style Guidelines:

- Light color scheme, conveying clarity and professionalism. Primary color: Deep ocean blue (#2952A3), symbolizing trust and insight. Background color: Very light blue-grey (#ECEFF2), providing a clean canvas. Accent color: Vibrant cyan (#4DCCE1), for interactive elements and highlights, suggesting precision and innovation.
- Headline and body font: 'Inter' (sans-serif) for its modern, neutral, and highly readable characteristics, suitable for conveying analytical results clearly.
- Use modern, minimalist outline icons for actions (e.g., 'Analyze', 'Clear') and for visual representation of scores (e.g., star outlines for scores, simple progress bars), maintaining a clean aesthetic.
- A clean and responsive layout optimized for readability on various devices. The design prioritizes clear separation of input fields and result display, with ample white space to enhance focus. A two-column or stacked layout ensures an intuitive user flow from question to analysis.
- Subtle and functional animations to provide visual feedback. This includes a gentle spinner or progress animation during analysis, and smooth transitions when results appear, enhancing the user experience without distraction.