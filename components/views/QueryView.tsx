import React, { useState, useRef, useEffect } from 'react';
// Fix: Use correct imports from @google/genai
import { GoogleGenAI, Chat } from '@google/genai';
// Fix: Combine imports from the same module
import { vectorIndexes, SpinnerIcon } from '../../constants';

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

const QueryView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        // Fix: Use new GoogleGenAI({apiKey: ...}) for initialization
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        // Fix: Use ai.chats.create to start a chat session
        const newChat = ai.chats.create({
            // Fix: Use gemini-2.5-flash model for text generation
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are a helpful AI assistant for querying documents. Base your answers on the provided knowledge base.',
            },
        });
        setChat(newChat);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const prompt = `Using the knowledge from indexes: [${selectedIndexes.map(id => vectorIndexes.find(v => v.id === id)?.name).join(', ')}], answer the following question: ${input}`;
            
            // Fix: Use chat.sendMessageStream for streaming responses
            const resultStream = await chat.sendMessageStream({ message: prompt });
            
            let botResponse = '';
            setMessages(prev => [...prev, { sender: 'bot', text: '' }]);
            for await (const chunk of resultStream) {
                // Fix: Access text directly from the chunk response
                botResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = botResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIndexSelection = (indexId: number) => {
        setSelectedIndexes(prev =>
            prev.includes(indexId) ? prev.filter(id => id !== indexId) : [...prev, indexId]
        );
    };

    const markdownToHtml = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-900 p-2 rounded-md"><code>$1</code></pre>')
            .replace(/\n/g, '<br />');
    };

    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-1">Query Configuration</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Select the vector indexes to use for your query.</p>
                <div className="space-y-3">
                    {vectorIndexes.map(index => (
                        <div key={index.id} className="flex items-center">
                            <input 
                                type="checkbox"
                                id={`index-${index.id}`}
                                checked={selectedIndexes.includes(index.id)}
                                onChange={() => handleIndexSelection(index.id)}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label htmlFor={`index-${index.id}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                {index.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col" style={{ height: '70vh' }}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                     <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">Query Engine</h4>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'bot' && <div className="w-8 h-8 bg-primary-500 rounded-full flex-shrink-0"></div>}
                                <div className={`px-4 py-2 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.text) }}></p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-2">
                                <div className="w-8 h-8 bg-primary-500 rounded-full flex-shrink-0"></div>
                                <div className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                                    <SpinnerIcon className="h-5 w-5 text-gray-500" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question about your documents..."
                            className="flex-1 block w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            disabled={selectedIndexes.length === 0}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim() || selectedIndexes.length === 0}
                            className="ml-4 px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
                        >
                            Send
                        </button>
                    </form>
                    {selectedIndexes.length === 0 && <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Please select at least one index to start querying.</p>}
                </div>
            </div>
        </div>
    );
};

export default QueryView;