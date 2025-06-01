import React, { Component } from 'react';
import $ from 'jquery';
import ReactGA from 'react-ga4';
import emailjs from '@emailjs/browser';

export class Gedit extends Component {

    constructor() {
        super();
        this.state = {
            sending: false,
            focused: null,
        }
    }

    componentDidMount() {
        emailjs.init(process.env.NEXT_PUBLIC_USER_ID);
    }

    handleFocus = (field) => {
        this.setState({ focused: field });
    }

    handleBlur = () => {
        this.setState({ focused: null });
    }

    sendMessage = async () => {
        let name = $("#sender-name").val();
        let subject = $("#sender-subject").val();
        let message = $("#sender-message").val();

        name = name.trim();
        subject = subject.trim();
        message = message.trim();

        let error = false;

        if (name.length === 0) {
            $("#sender-name").val('');
            $("#sender-name").attr("placeholder", "Name must not be Empty!");
            error = true;
        }

        if (message.length === 0) {
            $("#sender-message").val('');
            $("#sender-message").attr("placeholder", "Message must not be Empty!");
            error = true;
        }
        if (error) return;

        this.setState({ sending: true });

        const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        
        // Updated template parameters - make sure your EmailJS template uses these exact names
        const templateParams = {
            from_name: name,
            from_email: name, // If name contains email, otherwise add separate email field
            subject: subject,
            message: message,
            to_name: 'Raw',
            to_email: 'rawx18.dev@gmail.com'
        }

        try {
            await emailjs.send(serviceID, templateID, templateParams);
            console.log('Email sent successfully');
            this.setState({ sending: false });
            // Clear the form
            $("#sender-name").val('');
            $("#sender-subject").val('');
            $("#sender-message").val('');
            $("#close-gedit").trigger("click");
        } catch (error) {
            console.error('Email send failed:', error);
            this.setState({ sending: false });
            alert('Failed to send message. Please try again.');
        }

        ReactGA.event({
            category: "Send Message",
            action: `${name}, ${subject}, ${message}`
        });
    }

    render() {
        return (
            <div className="w-full h-full relative flex flex-col bg-gray-950 text-white select-none">
                {/* Subtle background grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-80"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between w-full bg-gray-900/50 backdrop-blur-md border-b border-gray-700 flex-shrink-0">
                    <div className="flex items-center ml-6 py-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3"></div>
                        <span className="font-medium text-lg text-gray-100">
                            Contact Form
                        </span>
                    </div>
                    <div className="flex mr-6">
                        <button 
                            onClick={this.sendMessage} 
                            disabled={this.state.sending}
                            className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border border-gray-600 hover:border-gray-500"
                        >
                            {this.state.sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </div>

                {/* Main Content - Fixed scrolling */}
                <div className="relative z-10 flex-1 overflow-y-auto">
                    <div className="p-8 space-y-6 max-w-2xl mx-auto w-full min-h-full">
                        
                        {/* Header Text */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-medium text-gray-100 mb-2">Get in Touch</h2>
                            <p className="text-gray-400 text-sm">Send me a message and I'll get back to you as soon as possible.</p>
                        </div>

                        {/* Name/Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Name / Email Address
                            </label>
                            <div className="relative">
                                <input 
                                    id="sender-name" 
                                    className="w-full bg-gray-900/60 backdrop-blur-sm text-gray-100 placeholder-gray-500 px-4 py-3 rounded-lg outline-none text-sm border border-gray-700 focus:border-gray-500 focus:bg-gray-900/80 transition-all duration-200" 
                                    placeholder="Your name or email address"
                                    spellCheck="false" 
                                    autoComplete="off" 
                                    type="text"
                                    onFocus={() => this.handleFocus('name')}
                                    onBlur={this.handleBlur}
                                />
                                <div className="absolute top-0 right-4 h-full flex items-center">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${this.state.focused === 'name' ? 'bg-emerald-400' : 'bg-gray-600'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Subject Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Subject
                            </label>
                            <div className="relative">
                                <input 
                                    id="sender-subject" 
                                    className="w-full bg-gray-900/60 backdrop-blur-sm text-gray-100 placeholder-gray-500 px-4 py-3 rounded-lg outline-none text-sm border border-gray-700 focus:border-gray-500 focus:bg-gray-900/80 transition-all duration-200" 
                                    placeholder="Brief subject line"
                                    spellCheck="false" 
                                    autoComplete="off" 
                                    type="text"
                                    onFocus={() => this.handleFocus('subject')}
                                    onBlur={this.handleBlur}
                                />
                                <div className="absolute top-0 right-4 h-full flex items-center">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${this.state.focused === 'subject' ? 'bg-emerald-400' : 'bg-gray-600'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Message
                            </label>
                            <div className="relative">
                                <textarea 
                                    id="sender-message" 
                                    className="w-full h-64 bg-gray-900/60 backdrop-blur-sm text-gray-100 placeholder-gray-500 px-4 py-3 rounded-lg outline-none text-sm resize-none border border-gray-700 focus:border-gray-500 focus:bg-gray-900/80 transition-all duration-200" 
                                    placeholder="Type your message here..."
                                    spellCheck="false" 
                                    autoComplete="none"
                                    onFocus={() => this.handleFocus('message')}
                                    onBlur={this.handleBlur}
                                />
                                <div className="absolute top-3 right-4">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${this.state.focused === 'message' ? 'bg-emerald-400' : 'bg-gray-600'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-800">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                    <span>Secure</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    <span>Encrypted</span>
                                </div>
                            </div>
                            <div className="font-mono text-xs">
                                rawx18.dev@gmail.com
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading Overlay */}
                {this.state.sending && (
                    <div className="absolute inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm">
                        <div className="text-center bg-gray-900 rounded-lg p-8 border border-gray-700">
                            <div className="relative mb-4">
                                <div className="w-12 h-12 border-4 border-gray-600 border-t-emerald-400 rounded-full animate-spin"></div>
                            </div>
                            <div className="text-gray-300 text-sm font-medium">
                                Sending message...
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                                Please wait a moment
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Gedit;

export const displayGedit = () => {
    return <Gedit />;
}