
'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { websiteChatbot, WebsiteChatbotOutput } from '@/ai/flows/website-chatbot';

type Message = {
  role: 'user' | 'bot';
  content: string;
  actions?: WebsiteChatbotOutput['actions'];
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setMessages([
            { role: 'bot', content: "Hello! I'm Core-AI, Coreveil's AI assistant. How can I help you today? You can ask me about our services, pricing, or how to get started." }
        ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await websiteChatbot({ question: input });
      const botMessage: Message = { role: 'bot', content: response.answer, actions: response.actions };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = { role: 'bot', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn(
        "fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "scale-0" : "scale-100"
      )}>
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover-lift p-0 overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <Image src="/img1.jpg" alt="Chatbot Icon" width={64} height={64} className="object-cover"/>
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] origin-bottom-right transition-all duration-300 ease-in-out",
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col h-full bg-secondary/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl">
          <header className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-secondary rounded-lg flex items-center justify-center ring-1 ring-border overflow-hidden">
                <Image src="/logo.jpg" alt="Coreveil Logo" width={40} height={40} className="object-cover" />
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </header>

          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                   {message.role === 'bot' && (
                     <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                       <Bot className="w-5 h-5 text-blue-400" />
                     </div>
                   )}
                  <div className="flex flex-col gap-2 max-w-[85%]">
                    <div className={cn(
                      "rounded-xl px-4 py-3 text-sm",
                      message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background/80'
                    )}>
                      {message.content}
                    </div>
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {message.actions.map((action, i) => (
                          <Button key={i} variant="outline" size="sm" asChild className="justify-between group bg-background/80 hover:bg-accent/80">
                            <Link href={action.url} target={action.url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                              {action.label}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && (
                     <div className="w-8 h-8 rounded-full bg-background/80 flex-shrink-0 flex items-center justify-center">
                       <User className="w-5 h-5 text-muted-foreground" />
                     </div>
                   )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                       <Bot className="w-5 h-5 text-blue-400" />
                   </div>
                  <div className="max-w-[80%] rounded-xl px-4 py-2 bg-background/80 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <footer className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Ask a question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                className="bg-background/80"
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading || input.trim() === ''}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
