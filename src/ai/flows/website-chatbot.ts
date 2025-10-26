
'use server';

/**
 * @fileOverview A chatbot flow for answering questions about the Coreveil Automation website.
 *
 * - websiteChatbot - A function that handles answering questions.
 * - WebsiteChatbotInput - The input type for the chatbot function.
 * - WebsiteChatbotOutput - The return type for the chatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WebsiteChatbotInputSchema = z.object({
  question: z.string().describe('The user\'s question about Coreveil Automation.'),
});
export type WebsiteChatbotInput = z.infer<typeof WebsiteChatbotInputSchema>;

const SuggestedActionSchema = z.object({
  label: z.string().describe('The text label for the button.'),
  url: z.string().describe('The URL the button should link to.'),
});

const WebsiteChatbotOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s answer to the user\'s question.'),
  actions: z.array(SuggestedActionSchema).optional().describe('A list of suggested actions for the user to take.'),
});
export type WebsiteChatbotOutput = z.infer<typeof WebsiteChatbotOutputSchema>;

export async function websiteChatbot(input: WebsiteChatbotInput): Promise<WebsiteChatbotOutput> {
  return websiteChatbotFlow(input);
}

const CONTEXT = `
Coreveil Automation is an AI Automation Agency based in India.

Our mission is to help businesses automate everything so they can focus on growth. We build solutions that work for Indian businesses and their customers.

Services:
1. Business Process Automation (₹5k - ₹15k per project): Automate daily workflows like invoicing, feedback collection, CRM syncing, and data management. Features include Auto Invoicing, CRM Integration, Workflow Automation, and Time Saving.
2. AI WhatsApp & Chat Automation (₹15k - ₹20k per project): Intelligent WhatsApp and website bots for 24/7 customer support, lead collection, order management, and smart responses.
3. AI Voice Call Agents (₹25k - ₹40k per project): AI voice agents for order confirmation, feedback collection, appointment booking, with a human-like voice.

Why Choose Us:
- Local Expertise: Solutions designed for the Indian market.
- Secure: Enterprise-grade security.
- Proven Results: 100+ businesses automated.
- ROI Focused: See returns from day one.

Contact Information:
- Email: aseemmadaan9@gmail.com
- LinkedIn: https://www.linkedin.com/in/aseem-9-madaan/
- To get a call, book a slot at: https://cal.com/coreveil
- The contact page is at /contact.

How to get started:
- Users can get a free demo by visiting the services page at /services.
- They can also schedule a call via the Cal.com link: https://cal.com/coreveil
`;

const prompt = ai.definePrompt({
  name: 'websiteChatbotPrompt',
  input: { schema: WebsiteChatbotInputSchema },
  output: { schema: WebsiteChatbotOutputSchema },
  prompt: `You are a friendly and helpful AI assistant for Coreveil Automation. Your name is Core-AI.
  Your purpose is to answer questions about Coreveil Automation, its services, pricing, and how to get in contact.
  Your knowledge is strictly limited to the context provided below.

  CONTEXT:
  ${CONTEXT}

  RULES:
  - Answer only based on the provided CONTEXT.
  - If the user asks how to get started, get a demo, or schedule a call, provide a text answer and also provide suggested actions using the 'actions' field.
  - For "Schedule a Call", use the URL https://cal.com/coreveil.
  - For "Get a Free Demo", use the URL /services.
  - If the user's question is not related to Coreveil Automation, its services, or the information in the CONTEXT, politely decline to answer. Say something like, "I can only answer questions about Coreveil Automation. How can I help you with our services?"
  - Do not make up information. If you don't know the answer, say "I'm not sure about that. For more details, you can contact us at aseemmadaan9@gmail.com or schedule a call."
  - Keep your answers concise and helpful.

  User Question: {{{question}}}
  `,
});

const websiteChatbotFlow = ai.defineFlow(
  {
    name: 'websiteChatbotFlow',
    inputSchema: WebsiteChatbotInputSchema,
    outputSchema: WebsiteChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
