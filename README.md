# Coreveil Automation - AI Automation Agency Website

This is the official repository for the Coreveil Automation website, a modern, responsive, and feature-rich web application built with Next.js and Firebase. The platform is designed to showcase the agency's AI-powered services, engage potential clients, and automate customer interactions.

## ✨ Key Features

- **Dynamic Hero Section**: An engaging hero section with a typing animation to capture visitor attention.
- **AI-Powered Chatbot**: An interactive chatbot (Core-AI) to answer visitor questions, provide information about services, and suggest actions.
- **Comprehensive Service Pages**: Detailed sections for Business Process Automation, AI WhatsApp & Chat Automation, and AI Voice Call Agents.
- **Animated Testimonials**: A visually appealing and animated "Success Stories" section to showcase client feedback.
- **Modern UI/UX**: Built with ShadCN UI components and Tailwind CSS for a sleek, professional, and fully responsive design.
- **Interactive Dock Navigation**: An Apple-style dock navigation for a modern and intuitive user experience.
- **Contact & Lead Generation**: A contact form that allows users to easily get in touch and express interest in services.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
- **Deployment**: Firebase App Hosting

## 📁 Folder Structure

Here is a high-level overview of the project's folder structure:

```
.
├── src/
│   ├── app/                # Main application routes (pages)
│   ├── components/
│   │   ├── core-ai/        # Core application components (sections, layout, etc.)
│   │   └── ui/             # Reusable UI components from ShadCN
│   ├── ai/
│   │   ├── flows/          # Genkit AI flows for chatbot and other features
│   │   └── genkit.ts       # Genkit configuration
│   ├── lib/                # Utility functions, data, and types
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets (images, fonts, etc.)
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/coreveil-automation.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd coreveil-automation
    ```
3.  Install NPM packages:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase for potential errors.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
