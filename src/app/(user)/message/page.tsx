"use client"
import { useEffect } from 'react'
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Page = () => {
    useEffect(() => {
        // Create SockJS client
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
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
    }, []); // Empty dependency array → run once on mount
}

export default Page