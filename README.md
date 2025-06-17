# Voice Bot - Groq + Cartesia

A sophisticated voice-to-voice chatbot that uses Whisper for speech-to-text, LLaMA-3.1 for responses, and browser TTS for speech output. Powered by Groq's lightning-fast inference.

## 🚀 Features

- **🎤 Voice Input**: High-quality speech recognition using Whisper-large-v3
- **🧠 Smart Responses**: LLaMA-3.1-70B with Claude's personality and reasoning style  
- **🗣️ Voice Output**: Natural text-to-speech responses
- **⚡ Fast Processing**: Groq's optimized inference for near real-time responses
- **🎨 Modern UI**: Beautiful glassmorphism design with real-time audio visualization
- **💾 Conversation Memory**: Maintains context across the conversation
- **🔒 Privacy-First**: API keys stored locally, no data sent to third parties

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Speech-to-Text**: Groq Whisper API (whisper-large-v3)
- **Language Model**: Groq LLaMA API (llama-3.1-70b-versatile)
- **Text-to-Speech**: Browser Web Speech API
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Local Development

1. **Clone and install:**
   ```bash
   git clone <your-repo>
   cd claude-voice-bot-whisper-llama
   npm install
   ```

2. **Get Cartesia API Key:**
   - Visit [cartesia](https://play.cartesia.ai/)
   - Sign up for free account
   - Generate API Key
     
4. **Get Groq API Key:**
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up for free account
   - Generate API key

5. **Run development server:**
   ```bash
   npm run dev
   ```

6. **Open browser:**
   - Navigate to `http://localhost:3000`
   - Start voice conversations!

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository  
   - Deploy automatically
   - Share the live URL!

## 🎯 How It Works

1. **🎤 Voice Capture**: Records high-quality audio with noise suppression
2. **📝 Transcription**: Groq Whisper converts speech to text with 95%+ accuracy
3. **🧠 AI Processing**: LLaMA-3.1-70B generates Claude-like responses via Groq
4. **🗣️ Speech Synthesis**: Browser TTS converts response back to natural speech
5. **💬 Conversation**: Maintains context for natural back-and-forth dialogue

## 🎨 Features Showcase

- **Real-time Audio Visualization**: See audio levels while recording
- **Processing Pipeline**: Visual feedback for each step (Whisper → LLaMA → TTS)
- **Example Questions**: Pre-built prompts to test Claude-like personality
- **Conversation History**: Scrollable chat interface with message history
- **Voice Controls**: Easy start/stop recording and speech output
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Configuration

### API Settings
- **Groq API Key**: Required for Whisper + LLaMA access
- **Voice Output**: Toggle text-to-speech on/off
- **Model Settings**: Uses optimal Groq models (Whisper-large-v3, LLaMA-3.1-70B)

### Audio Settings
- **Sample Rate**: 16kHz for optimal Whisper performance
- **Audio Format**: WebM/Opus for best compression
- **Noise Suppression**: Enabled for clearer transcription

## 💡 Example Questions

The bot is designed to respond as Claude would to questions like:
- "What should we know about your life story?"
- "What's your number one superpower?"  
- "What are the top 3 areas you'd like to grow in?"
- "What misconception do people have about you?"
- "How do you push your boundaries and limits?"

## 🔒 Privacy & Security

- **Local Storage**: API keys stored in browser localStorage only
- **No Data Collection**: Conversations not saved on servers
- **Direct API Calls**: Audio/text sent directly to Groq, not stored
- **Open Source
