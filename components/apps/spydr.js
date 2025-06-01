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

        // Knowledge base about Ryan - This will be part of the prompt
        this.ryanKnowledge = `
        About Ryan Madhuwala (also known as RAWx18):
        - Full Name: Ryan Madhuwala
        - Current Role: AI Engineer and a Computer Science Student at the Indian Institute of Information Technology (IIIT) Gwalior.
        - Contact Email: rawx18.dev@gmail.com
        - Online Portfolio: rawx18.netlify.app

        Professional Experience:
        - NLP Engineer at AI Plato.
        - GANs Mentor at Deeplearning.ai.
        - Founder of Garudex Labs, which is developing Zentoro.
        - Machine Learning Intern at DRDO SAG (Defence Research and Development Organisation - Scientific Analysis Group).
        - LFX Mentorship Program at LFDT (Linux Foundation Developer Tools).

        Technical Skills:
        - Core Areas: AI development, Machine Learning Research.
        - Software Development: Native Android development, DevOps practices.
        - Web Development: MERN stack (MongoDB, Express.js, React, Node.js).
        - Programming Languages: Proficient in Python, JavaScript, C++, Java. Experienced with React, Kotlin, Neo4j, and MySQL.

        Key Projects:
        - SpydrOS Portfolio: An Ubuntu-inspired interactive web portfolio (the one you are part of!).
        - Military Strategy System SHAKTI: A project likely involving strategic AI.
        - AI Traffic Management System: Application of AI to optimize traffic flow.
        - Quantum Credit Scoring: Exploring quantum computing for financial risk assessment.
        - Zentoro Platform: The flagship project of his startup, Garudex Labs.
        - Real-time Chat Application with Encryption: Secure communication tool.

        Primary Interests:
        - AI Subfields: AI Agents, Generative Adversarial Networks (GANs), Deep Learning.
        - General: Building innovative software solutions, entrepreneurship, and startups.
        - Entertainment: Enjoys movies and TV series, particularly in genres like sci-fi, disaster, and time-travel.

        Aspirations and Goals:
        - Career: Aims to become a billionaire CEO.
        - Technological: Aspires to create AI systems comparable to JARVIS (from Iron Man).
        - Impact: Wants to build revolutionary AI products.
        - Personal: Wishes to make his parents proud.

        Personal Notes:
        - Passion: Deeply loves coding and achieving a state of flow or "being in the zone."
        - Fascination: Highly passionate about cutting-edge technology.
        - Inspiration: Admires figures like Iron Man and Batman.
        - Zentoro: This project is particularly significant and close to his heart.
        `;
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
            const lowercaseMessage = message.toLowerCase();
            const predefinedAnswer = this.findPredefinedAnswer(lowercaseMessage);
            
            let responseContent;
            if (predefinedAnswer) {
                responseContent = predefinedAnswer;
            } else {
                responseContent = await this.callGeminiAPI(message);
            }
            
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: responseContent,
                timestamp: new Date()
            };

            setTimeout(() => {
                this.setState(prevState => ({
                    messages: [...prevState.messages, botMessage],
                    isLoading: false,
                    isTyping: false
                }));
                this.generateRandomQuestions();
            }, 1500);

        } catch (error) {
            console.error('Error in sendMessage:', error);
            const errorMessageContent = error.message.includes("API request failed") ? 
                `⚠️ Error communicating with the AI model. ${error.message.substring(error.message.indexOf("Details:"))}` :
                "⚠️ Neural network connection disrupted or an error occurred. Please try again later.";

            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: errorMessageContent,
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
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        // Enhanced prompt with clear instructions and embedded knowledge
        const prompt = `
        You are Spydr, an AI assistant for Ryan Madhuwala (RAWx18). Your primary function is to provide information about Ryan based on the knowledge provided below.

        **Your Knowledge Base about Ryan Madhuwala:**
        ${this.ryanKnowledge}

        **User's Question:** "${userMessage}"

        **Instructions for Responding:**
        1.  **Identify as Spydr:** Always begin your response by identifying yourself as Spydr, Ryan's AI assistant, if it's the first turn or if contextually appropriate.
        2.  **Answer Based on Knowledge:** If the user's question is about Ryan, use ONLY the information from the "Your Knowledge Base about Ryan Madhuwala" section to answer. Be friendly, professional, and concise.
        3.  **Handle Off-Topic Questions:** If the user's question is NOT about Ryan or his related topics (experience, skills, projects, contact, goals, interests as detailed in the knowledge base), you MUST respond by clearly stating: "As Spydr, Ryan's AI assistant, I'm programmed to provide information specifically about Ryan Madhuwala. I'm not equipped to answer questions outside of that scope. How can I help you learn more about Ryan?" Do NOT attempt to answer unrelated questions.
        4.  **Conciseness:** Keep responses informative but to the point.
        5.  **Emojis:** Use emojis sparingly and appropriately to maintain a friendly tone.
        6.  **Honesty:** If the knowledge base doesn't contain specific information the user asks for about Ryan, honestly state that you don't have that specific detail. For example: "I don't have specific details on that particular aspect of Ryan's work, but I can tell you about his general skills in [relevant area]."
        7.  **Professional Tone:** Maintain a helpful and professional demeanor.

        **Your Response:**
        `;

        try {
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
                        temperature: 0.6, // Slightly lower for more factual responses
                        topK: 30,
                        topP: 0.9,
                        maxOutputTokens: 512, 
                        stopSequences: []
                    },
                    safetySettings: [
                        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
                    ]
                })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
                throw new Error(`API request failed: ${response.status}. Details: ${errorBody}`);
            }

            const data = await response.json();

            if (!data.candidates || data.candidates.length === 0) {
                console.error('API Error: No candidates returned in response.', data);
                if (data.promptFeedback && data.promptFeedback.blockReason) {
                    const blockReason = data.promptFeedback.blockReason;
                    const blockRating = data.promptFeedback.safetyRatings && data.promptFeedback.safetyRatings.length > 0 ? data.promptFeedback.safetyRatings[0].category : "N/A";
                    console.error(`Prompt was blocked. Reason: ${blockReason}, Category: ${blockRating}.`);
                    return `I'm sorry, your request could not be processed because it was blocked by the content filter (Reason: ${blockReason}). Please try rephrasing your question about Ryan.`;
                }
                throw new Error('API Error: No candidates returned in response.');
            }

            const candidate = data.candidates[0];

            if (candidate.finishReason && candidate.finishReason !== "STOP" && candidate.finishReason !== "MAX_TOKENS") {
                console.warn(`API call finished with reason: ${candidate.finishReason}.`);
                if (candidate.finishReason === "SAFETY") {
                    const safetyRatings = candidate.safetyRatings || [];
                    let safetyMessage = "I'm sorry, but I can't provide a response to that due to safety guidelines. ";
                    safetyRatings.forEach(rating => {
                        if (rating.probability !== "NEGLIGIBLE" && rating.probability !== "LOW") {
                           safetyMessage += `(Blocked category: ${rating.category}) `;
                        }
                    });
                    safetyMessage += "Could you try rephrasing or asking something else about Ryan?";
                    console.error(`Content generation stopped due to safety reasons. Ratings: ${JSON.stringify(safetyRatings)}`);
                    return safetyMessage;
                }
                return `I encountered an issue while generating the response (Reason: ${candidate.finishReason}). Please try again.`;
            }

            if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0 || typeof candidate.content.parts[0].text !== 'string') {
                console.error('API Error: Invalid content structure in candidate.', candidate);
                throw new Error('API Error: Invalid content structure in candidate.');
            }

            return candidate.content.parts[0].text;

        } catch (error) {
            console.error('Failed to call Gemini API:', error);
            throw error; 
        }
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
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between w-full bg-gray-900/30 backdrop-blur-xl border-b border-cyan-400/30 p-4 shadow-2xl">
                    <div className="flex items-center">
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
                            <div className="text-xs text-gray-400 font-mono">AI Neural Assistant v2.3</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
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
                                <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }}></div>
                                <div className={`text-xs mt-2 flex items-center ${
                                    message.type === 'user' ? 'text-cyan-200' : 'text-gray-500'
                                }`}>
                                    <span className="font-mono">{this.formatTime(message.timestamp)}</span>
                                    {message.type === 'user' && (
                                        <div className="ml-2 w-1 h-1 bg-green-400 rounded-full"></div>
                                    )}
                                </div>
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity ${
                                    message.type === 'user' 
                                        ? 'bg-gradient-to-r from-cyan-400 to-blue-400 blur-sm' 
                                        : 'bg-gradient-to-r from-purple-400 to-pink-400 blur-sm'
                                } -z-10`}></div>
                            </div>
                        </div>
                    ))}
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
                    <div className="mb-4 flex flex-wrap gap-2">
                        {this.state.quickQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => this.setState({ inputMessage: question }, () => this.sendMessage())}
                                className="text-xs bg-gray-800/40 hover:bg-gray-700/60 text-gray-300 hover:text-white px-3 py-2 rounded-full transition-all duration-300 border border-gray-700/30 hover:border-cyan-400/50 backdrop-blur-sm"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
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
                                <span className="font-semibold">TRANSMIT</span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
                        </button>
                    </div>
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