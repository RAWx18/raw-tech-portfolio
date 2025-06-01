import React, { Component } from 'react';
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Spydr extends Component {
    constructor() {
        super();
        this.state = {
            messages: [
                {
                    id: 1,
                    type: 'bot',
                    content: "🤖 Hello! I'm Spydr, Ryan's AI assistant. I can help you learn more about Ryan, his projects, skills, and experience. What would you like to know?",
                    timestamp: new Date()
                }
            ],
            inputMessage: '',
            isTyping: false,
            isLoading: false,
            quickQuestions: []
        };
        
        // Predefined Q&A pairs
        this.predefinedQA = {
            "tell me about ryan": "Ryan Madhuwala (RAWx18) is an AI Engineer and Computer Science student at IIIT Gwalior. He's passionate about building innovative AI solutions and dreams of creating technology like JARVIS! 🚀",
            
            "what is ryan's experience": "Ryan has incredible experience! He's worked as an NLP Engineer at AI Plato, GANs Mentor at Deeplearning.ai, founded Garudex Labs - Zentoro, ML Intern at DRDO SAG, and LFX at LFDT. Quite impressive! 💼",
            
            "what projects has ryan worked on": "Ryan has built some amazing projects! Including SpydrOS Portfolio (this Ubuntu-inspired portfolio), Military Strategy System SHAKTI, AI Traffic Management System, Quantum Credit Scoring, Zentoro Platform, and real-time chat applications with encryption. 🛠️",
            
            "what are ryan's skills": "Ryan is skilled in AI development, Machine Learning Research, Native Android development, DevOps, and the MERN stack. He codes in Python, JavaScript, C++, Java, React, Kotlin, Neo4j, and MySQL. He's basically a coding wizard! ⚡",
            
            "how can i contact ryan": "You can reach Ryan at rawx18.dev@gmail.com or check out his portfolio at rawx18.netlify.app. He's always excited to connect with fellow tech enthusiasts! 📧",
            
            "what is zentoro": "Zentoro is Ryan's startup platform under Garudex Labs. It's very close to his heart and represents his entrepreneurial spirit in building revolutionary AI products! 💎",
            
            "what are ryan's goals": "Ryan dreams big! He wants to become a billionaire CEO, create AI similar to JARVIS, build revolutionary AI products, and make his parents proud. He's basically aiming to be the next Tony Stark! 🎯",
            
            "what does ryan love": "Ryan loves coding and getting 'in the zone'! He's passionate about cutting-edge technology, AI Agents, GANs, Deep Learning, and building innovative software solutions. He also enjoys sci-fi, disaster, and time-travel movies! 🎬",
            
            "where does ryan study": "Ryan is a Computer Science student at IIIT Gwalior, one of India's premier technical institutions. He's combining his academic knowledge with real-world experience! 🎓",
            
            "what is ryan's personality": "Ryan is passionate, ambitious, and tech-obsessed! He dreams of being like Iron Man or Batman and is always pushing the boundaries of what's possible with AI and technology. He's the perfect blend of dreamer and doer! 🦸‍♂️"
        };

        // All possible quick questions
        this.allQuickQuestions = [
            "Tell me about Ryan",
            "What is Ryan's experience?",
            "What projects has Ryan worked on?",
            "What are Ryan's skills?",
            "How can I contact Ryan?",
            "What is Zentoro?",
            "What are Ryan's goals?",
            "What does Ryan love?",
            "Where does Ryan study?",
            "What is Ryan's personality?"
        ];
    }

    componentDidMount() {
        ReactGA.send({ hitType: "pageview", page: "/spydr-chat", title: "Spydr AI Chat" });
        this.scrollToBottom();
        this.generateRandomQuestions();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    generateRandomQuestions = () => {
        // Shuffle and pick 4 random questions
        const shuffled = [...this.allQuickQuestions].sort(() => 0.5 - Math.random());
        this.setState({ quickQuestions: shuffled.slice(0, 4) });
    }

    scrollToBottom = () => {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    handleInputChange = (e) => {
        this.setState({ inputMessage: e.target.value });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage = async () => {
        const message = this.state.inputMessage.trim();
        if (!message || this.state.isLoading) return;

        // Add user message immediately
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: message,
            timestamp: new Date()
        };

        this.setState({
            messages: [...this.state.messages, userMessage],
            inputMessage: '',
            isLoading: true,
            isTyping: true
        });

        ReactGA.event({
            category: "Spydr Chat",
            action: "User Message",
            label: message
        });

        try {
            // Check for predefined answers first
            const lowercaseMessage = message.toLowerCase();
            const predefinedAnswer = this.findPredefinedAnswer(lowercaseMessage);
            
            let response;
            if (predefinedAnswer) {
                response = predefinedAnswer;
            } else {
                response = await this.callGeminiAPI(message);
            }
            
            // Add bot response
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: response,
                timestamp: new Date()
            };

            setTimeout(() => {
                this.setState(prevState => ({
                    messages: [...prevState.messages, botMessage],
                    isLoading: false,
                    isTyping: false
                }));
                // Generate new random questions after each interaction
                this.generateRandomQuestions();
            }, 1500);

        } catch (error) {
            console.error('Error calling Gemini API:', error);
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: "⚠️ Neural network connection disrupted. Please try again later.",
                timestamp: new Date()
            };

            setTimeout(() => {
                this.setState(prevState => ({
                    messages: [...prevState.messages, errorMessage],
                    isLoading: false,
                    isTyping: false
                }));
            }, 1000);
        }
    }

    findPredefinedAnswer = (message) => {
        for (const [key, answer] of Object.entries(this.predefinedQA)) {
            if (message.includes(key.toLowerCase()) || 
                key.toLowerCase().includes(message) ||
                this.calculateSimilarity(message, key.toLowerCase()) > 0.6) {
                return answer;
            }
        }
        return null;
    }

    calculateSimilarity = (str1, str2) => {
        const words1 = str1.split(' ');
        const words2 = str2.split(' ');
        const commonWords = words1.filter(word => words2.includes(word));
        return commonWords.length / Math.max(words1.length, words2.length);
    }

    callGeminiAPI = async (userMessage) => {
        const apiKey = "AIzaSyBqrJpN-6p32FZ-O--w7LA5cFjA9YJmK90";
        // Using the free tier endpoint
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const ryanKnowledge = `
        About Ryan (RAWx18):
        - Name: Ryan Madhuwala
        - Role: AI Engineer & Computer Science Student at IIIT Gwalior
        - Email: rawx18.dev@gmail.com
        - Portfolio: rawx18.netlify.app
        
        Experience:
        - NLP Engineer @ AI Plato
        - GANs Mentor @ Deeplearning.ai
        - Founder @ Garudex Labs - Zentoro
        - ML Intern @ DRDO SAG
        - LFX @ LFDT
        
        Skills:
        - AI development, Machine Learning Research
        - Native Android development, DevOps
        - MERN stack (MongoDB, Express, React, Node.js)
        - Programming Languages: Python, JavaScript, C++, Java, React, Kotlin, Neo4j, MySQL
        
        Projects:
        - SpydrOS Portfolio (Ubuntu-inspired portfolio)
        - Military Strategy System SHAKTI
        - AI Traffic Management System
        - Quantum Credit Scoring
        - Zentoro Platform
        - Real-time Chat Application with encryption
        
        Goals:
        - Become a billionaire CEO
        - Create AI similar to JARVIS
        - Build revolutionary AI products
        - Make parents proud
        `;

        const prompt = `You are Spydr, Ryan's personal AI assistant. Answer questions about Ryan Madhuwala (RAWx18) in a friendly, professional manner.

Here's what you know about Ryan: ${ryanKnowledge}

User question: ${userMessage}

Instructions:
- Answer as Spydr, Ryan's AI assistant
- Be helpful, friendly, and professional
- If asked about Ryan, use the knowledge provided
- If asked about something not related to Ryan, politely redirect to Ryan-related topics
- Keep responses concise but informative
- Use emojis occasionally to be friendly
- If you don't know something specific about Ryan, say so honestly

Response:`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 20,
                    topP: 0.8,
                    maxOutputTokens: 512, // Reduced for free tier
                    stopSequences: []
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid API response structure');
        }

        return data.candidates[0].content.parts[0].text;
    }

    formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    clearChat = () => {
        this.setState({
            messages: [
                {
                    id: 1,
                    type: 'bot',
                    content: "🔄 Neural pathways cleared. How can I assist you in learning about Ryan?",
                    timestamp: new Date()
                }
            ]
        });
        this.generateRandomQuestions();
    }

    render() {
        return (
            <div className="w-full h-full flex flex-col bg-black text-white select-none overflow-hidden relative">
                {/* Futuristic Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    {/* Animated Orbs */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between w-full bg-gray-900/30 backdrop-blur-xl border-b border-cyan-400/30 p-4 shadow-2xl">
                    <div className="flex items-center">
                        {/* AI Avatar */}
                        <div className="relative mr-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-0.5">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                    <span className="text-lg">🕷️</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
                        </div>
                        
                        <div>
                            <div className="flex items-center">
                                <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    SPYDR
                                </span>
                                <div className="ml-2 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full">
                                    <span className="text-xs text-green-400 font-mono">ONLINE</span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 font-mono">AI Neural Assistant v1.0</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        {/* Neural Activity Indicator */}
                        <div className="flex items-center space-x-1">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
                            <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping animation-delay-2000"></div>
                        </div>
                        
                        <button 
                            onClick={this.clearChat}
                            className="relative group bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg text-sm transition-all duration-300 border border-gray-600/50 hover:border-cyan-400/50 backdrop-blur-sm"
                        >
                            <span className="relative z-10">Clear Neural Buffer</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div 
                    id="chat-messages"
                    className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10"
                >
                    {this.state.messages.map((message) => (
                        <div 
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-md relative group ${
                                message.type === 'user' 
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600' 
                                    : 'bg-gray-900/60 border border-gray-700/50 backdrop-blur-sm'
                            } rounded-2xl px-4 py-3 shadow-lg`}>
                                {/* Message content */}
                                <div className="text-sm leading-relaxed">{message.content}</div>
                                
                                {/* Timestamp */}
                                <div className={`text-xs mt-2 flex items-center ${
                                    message.type === 'user' ? 'text-cyan-200' : 'text-gray-500'
                                }`}>
                                    <span className="font-mono">{this.formatTime(message.timestamp)}</span>
                                    {message.type === 'user' && (
                                        <div className="ml-2 w-1 h-1 bg-green-400 rounded-full"></div>
                                    )}
                                </div>
                                
                                {/* Message glow effect */}
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity ${
                                    message.type === 'user' 
                                        ? 'bg-gradient-to-r from-cyan-400 to-blue-400 blur-sm' 
                                        : 'bg-gradient-to-r from-purple-400 to-pink-400 blur-sm'
                                } -z-10`}></div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {this.state.isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-6 py-4 rounded-2xl">
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono ml-3">Neural processing...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="relative z-10 border-t border-gray-800/50 bg-gray-900/20 backdrop-blur-xl p-6">
                    {/* Quick Questions */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {this.state.quickQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => this.setState({ inputMessage: question })}
                                className="text-xs bg-gray-800/40 hover:bg-gray-700/60 text-gray-300 hover:text-white px-3 py-2 rounded-full transition-all duration-300 border border-gray-700/30 hover:border-cyan-400/50 backdrop-blur-sm"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                    
                    {/* Input Field */}
                    <div className="flex space-x-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={this.state.inputMessage}
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="Enter neural query..."
                                disabled={this.state.isLoading}
                                className="w-full bg-gray-900/40 backdrop-blur-sm text-white placeholder-gray-500 px-6 py-4 rounded-2xl outline-none border border-gray-700/50 focus:border-cyan-400/50 transition-all duration-300 text-sm"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        
                        <button
                            onClick={this.sendMessage}
                            disabled={this.state.isLoading || !this.state.inputMessage.trim()}
                            className="relative group bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            {this.state.isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <span className="font-semibold">Send</span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
                        </button>
                    </div>
                    
                    {/* Status Bar */}
                    <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="font-mono">SECURE CHANNEL</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="font-mono">ENCRYPTED</span>
                            </div>
                        </div>
                        <div className="font-mono">
                            NEURAL_ID: SPY_0x7F4A
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Spydr;

export const displaySpydr = () => {
    return <Spydr />;
}