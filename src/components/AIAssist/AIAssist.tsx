import { useState } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { useAIStore } from '@/stores/useAIStore';
import { geminiService } from '@/services/geminiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import './AIAssist.css';

interface AIAssistProps {
  onContentGenerated: (content: string) => void;
}

const AIAssist = ({ onContentGenerated }: AIAssistProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addMessage } = useAIStore();

  const suggestedPrompts = [
    'Generate Summary',
    'Create a blog post about technology',
    'Write a tutorial on React hooks',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Store user message
      addMessage({
        role: 'user',
        content: prompt,
      });

      // Call Gemini API
      const generatedContent = await geminiService.generateContent(prompt);

      // Store assistant response
      addMessage({
        role: 'assistant',
        content: generatedContent,
      });

      // Pass content to parent (note editor)
      onContentGenerated(generatedContent);

      // Clear input and close
      setPrompt('');
      setIsOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
      setError(errorMessage);
      console.error('AI generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ai-assist-fab"
          title="AI Assist"
        >
          <Sparkles size={24} />
        </button>
      )}

      {/* AI Assist Panel */}
      {isOpen && (
        <div className="ai-assist-panel">
          <div className="ai-assist-header">
            <div className="ai-assist-title">
              <Sparkles size={20} />
              <span>AI Assist</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ai-assist-close"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div className="ai-assist-content">
            {/* Orb Animation */}
            <div className="ai-orb-container">
              <div className={`ai-orb ${isLoading ? 'loading' : ''}`}>
                {isLoading && <Loader2 className="ai-orb-spinner" size={32} />}
              </div>
            </div>

            <p className="ai-assist-prompt-text">
              {isLoading ? 'Generating content...' : 'What do you want to create?'}
            </p>

            {/* Error Message */}
            {error && (
              <div className="ai-assist-error">
                <p>{error}</p>
              </div>
            )}

            {/* Suggested Prompts */}
            {!isLoading && (
              <div className="ai-assist-suggestions">
                {suggestedPrompts.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(suggestion)}
                    className="ai-suggestion-chip"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="ai-assist-form">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="ai-assist-input"
              />
              <Button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="ai-assist-send"
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </Button>
            </form>

            <div className="ai-assist-footer">
              <Sparkles size={14} />
              <span>Topics</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssist;
