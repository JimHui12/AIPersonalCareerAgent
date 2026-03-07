import { useState, useEffect, useRef } from 'react'
import type { InterviewMessage } from '@/types/interview'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const MOCK_INITIAL_MESSAGE: InterviewMessage = {
    id: '1',
    role: 'interviewer',
    content: "Hello! I'm your AI interviewer today. To get started, could you please tell me a bit about your experience with React and TypeScript?",
    timestamp: new Date().toISOString()
}

export function InterviewPrep() {
    const [messages, setMessages] = useState<InterviewMessage[]>([MOCK_INITIAL_MESSAGE])
    const [inputValue, setInputValue] = useState('')
    const [isThinking, setIsThinking] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim() || isThinking) return

        const userMsg: InterviewMessage = {
            id: crypto.randomUUID(),
            role: 'candidate',
            content: inputValue,
            timestamp: new Date().toISOString()
        }

        setMessages(prev => [...prev, userMsg])
        setInputValue('')
        setIsThinking(true)

        // Simulated AI Response
        setTimeout(() => {
            const aiMsg: InterviewMessage = {
                id: crypto.randomUUID(),
                role: 'interviewer',
                content: "That's interesting. Can you elaborate on how you handle state management in large-scale applications?",
                timestamp: new Date().toISOString()
            }
            setMessages(prev => [...prev, aiMsg])
            setIsThinking(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                    <h3 className="font-semibold text-gray-900">AI Mock Interview</h3>
                    <p className="text-xs text-gray-500">Practicing for: Frontend Engineer Role</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-medium text-gray-600">Active Session</span>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex w-full",
                            msg.role === 'interviewer' ? "justify-start" : "justify-end"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                msg.role === 'interviewer'
                                    ? "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                                    : "bg-blue-600 text-white rounded-tr-none"
                            )}
                        >
                            {msg.content}
                            <div
                                className={cn(
                                    "text-[10px] mt-1 opacity-70",
                                    msg.role === 'interviewer' ? "text-gray-500" : "text-blue-100"
                                )}
                            >
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your answer here..."
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isThinking}
                    >
                        Send
                    </Button>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-[10px] text-gray-400">
                        Press Entetr to send
                    </p>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
                        End Interview
                    </Button>
                </div>
            </div>
        </div>
    )
}
