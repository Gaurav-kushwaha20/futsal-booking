"use client"
import { useEffect, useState } from 'react'
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Conversation = {
    id: number;
    user: {
        id: number;
        name: string;
    };
    totalMessages: number;
};

const Page = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        // Create SockJS client
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            // debug: (str) => console.log(str),

        });

        // On connect
        stompClient.onConnect = () => {
            console.log("Connected to WebSocket");

            // Subscribe to conversation topic
            stompClient.subscribe("/topic/conversations/1", (message) => {
                console.log("New message received:", JSON.parse(message.body));
            });

            // Send a test message
            stompClient.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify({
                    conversation: { id: 1 },
                    sender: { id: 2 },
                    content: "Hello from Next.js!",
                }),
            });
        };

        // Activate STOMP client
        stompClient.activate();

        // Cleanup on component unmount
        return () => {
            stompClient.deactivate();
        };
    }, []);

    useEffect(() => {
        // TODO: Replace with API call to your backend
        // Example static data
        setConversations([
            { id: 1, user: { id: 2, name: "Alice" }, totalMessages: 15 },
            { id: 2, user: { id: 3, name: "Bob" }, totalMessages: 8 },
            { id: 3, user: { id: 4, name: "Charlie" }, totalMessages: 22 },
        ]);
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
            <ul className="divide-y divide-gray-200">
                {conversations.map((conv) => (
                    <li
                        key={conv.id}
                        className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                        <div>
                            <p className="font-medium text-gray-800">{conv.user.name}</p>
                            <p className="text-sm text-gray-500">Conversation ID: {conv.id}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {conv.totalMessages} messages
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Page