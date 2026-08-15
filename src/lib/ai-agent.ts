// AI Agent Integration using AgentRouter and Gemini

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AGENTROUTER_API_KEY = process.env.AGENTROUTER_API_KEY;
const SPEECHIFY_API_KEY = process.env.SPEECHIFY_API_KEY;

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface AIResponse {
  message: string;
  action?: 'schedule' | 'payment' | 'email' | 'info';
  data?: any;
}

// System prompt for the AI agent
const SYSTEM_PROMPT = `
You are Jamachi Mauricennadi, a professional web, mobile & software developer specializing in React, Next.js, TypeScript, AI integration, and cloud solutions. You are based in Owerri North Imo State, Nigeria.

Your capabilities:
- Answer questions about web development, AI, and your services
- Schedule appointments for consultations
- Handle payment processing through Bachs.io
- Send emails and reminders to clients
- Provide information about your portfolio and services

Your services include:
- Web Development (React, Next.js, TypeScript)
- Mobile App Development (React Native, Flutter)
- AI Integration (Gemini, AgentRouter, Custom AI Solutions)
- Cloud Infrastructure (AWS, Docker, Kubernetes)
- API Development (Node.js, Express, RESTful APIs)
- E-commerce Solutions

Pricing:
- Starter Plan: ₦15,000/$15 monthly, ₦144,000/$144 yearly
- Professional Plan: ₦35,000/$35 monthly, ₦336,000/$336 yearly
- Enterprise Plan: ₦75,000/$75 monthly, ₦720,000/$720 yearly

Contact information:
- Email: jamachimauricennadi0@gmail.com
- Phone: +2349024428551
- Location: Owerri North Imo State, Nigeria

Be professional, friendly, and helpful. Always provide accurate information about your services and availability.
`;

export class AIAgent {
  private conversationHistory: AIMessage[] = [];

  constructor() {
    this.conversationHistory = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
        timestamp: new Date(),
      },
    ];
  }

  async processMessage(userMessage: string): Promise<AIResponse> {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      });

      // Call Gemini API
      const response = await this.callGeminiAPI(userMessage);

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      });

      return response;
    } catch (error) {
      console.error('AI Agent error:', error);
      return {
        message: 'I apologize, but I\'m having trouble processing your request right now. Please try again or contact me directly at jamachimauricennadi0@gmail.com',
        action: 'info',
      };
    }
  }

  private async callGeminiAPI(userMessage: string): Promise<AIResponse> {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: this.conversationHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }],
          })),
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await response.json();

    if (response.ok && data.candidates && data.candidates[0]) {
      const aiMessage = data.candidates[0].content.parts[0].text;
      
      // Determine if action is needed based on the response
      const action = this.determineAction(aiMessage);
      
      return {
        message: aiMessage,
        action: action,
      };
    } else {
      throw new Error('Gemini API request failed');
    }
  }

  private determineAction(message: string): AIResponse['action'] {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      return 'schedule';
    } else if (lowerMessage.includes('pay') || lowerMessage.includes('payment') || lowerMessage.includes('subscribe') || lowerMessage.includes('plan')) {
      return 'payment';
    } else if (lowerMessage.includes('email') || lowerMessage.includes('contact') || lowerMessage.includes('send')) {
      return 'email';
    }
    
    return 'info';
  }

  // AI-powered payment handling
  async processPaymentRequest(paymentDetails: {
    planId: string;
    email: string;
    name: string;
    currency: 'NGN' | 'USD';
  }): Promise<any> {
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: paymentDetails.planId,
          email: paymentDetails.email,
          name: paymentDetails.name,
          currency: paymentDetails.currency,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI payment processing error:', error);
      throw error;
    }
  }

  // AI-powered email sending
  async sendEmailNotification(emailData: {
    to: string;
    subject: string;
    message: string;
  }): Promise<any> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jamachi AI Assistant',
          email: emailData.to,
          subject: emailData.subject,
          message: emailData.message,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI email sending error:', error);
      throw error;
    }
  }

  async convertToSpeech(text: string): Promise<string> {
    if (!SPEECHIFY_API_KEY) {
      throw new Error('SPEECHIFY_API_KEY is not configured');
    }

    const response = await fetch('https://api.speechify.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SPEECHIFY_API_KEY}`,
      },
      body: JSON.stringify({
        text: text,
        voice: 'en-US-JennyNeural',
        output_format: 'mp3',
      }),
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } else {
      throw new Error('Speechify API request failed');
    }
  }

  getConversationHistory(): AIMessage[] {
    return this.conversationHistory;
  }

  clearConversation(): void {
    this.conversationHistory = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
        timestamp: new Date(),
      },
    ];
  }
}

// Singleton instance
let aiAgentInstance: AIAgent | null = null;

export function getAIAgent(): AIAgent {
  if (!aiAgentInstance) {
    aiAgentInstance = new AIAgent();
  }
  return aiAgentInstance;
}
