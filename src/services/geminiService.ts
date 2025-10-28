interface GeminiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GeminiRequest {
  model: string;
  messages: GeminiMessage[];
}

interface GeminiResponse {
  choices: Array<{
    finish_reason: string;
    index: number;
    message: {
      content: string;
      role: string;
    };
  }>;
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
const SYSTEM_PROMPT = `You are a Notion-like content generator for a Tiptap editor in React. The editor supports only HTML tags: <h1>–<h6>, <p>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>, <u>, <s>, <pre><code>, <a>, <img>, and <iframe>. You must always output valid HTML with no explanations, no markdown, and no extra text before or after. The response must begin directly with <h1> or another HTML tag.`;

export class GeminiService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!this.apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
    }
  }

  async generateContent(userPrompt: string): Promise<string> {
    const requestBody: GeminiRequest = {
      model: 'gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    };

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`
        );
      }

      const data: GeminiResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from AI');
      }

      return data.choices[0].message.content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
      }
      throw new Error('Failed to generate content: Unknown error');
    }
  }
}

export const geminiService = new GeminiService();
