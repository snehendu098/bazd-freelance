"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Video } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ChatInterface({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "maoridev",
      content: "Hi, can we have a meeting?",
      timestamp: "Nov 14, 2024, 11:27 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Me",
        content: inputMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const chargeHandler = async () => {
    const { data } = await axios.post("/api/create-charge");
    console.log(data);
  };

  return (
    <div className="flex h-[80vh] bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-80 border-r">
        <div className="p-4 border-b">
          <Button variant="secondary" className="w-full justify-start gap-2">
            <span className="font-semibold">All messages</span>
          </Button>
        </div>
        <ScrollArea>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full bg-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium truncate">User {i + 1}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                M
              </div>
            </div>
            <div>
              <h2 className="font-semibold">maoridev</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Video className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "Me" ? "justify-end" : ""}`}
              >
                {message.sender !== "Me" && (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    M
                  </div>
                )}
                <div
                  className={`flex flex-col gap-1 ${message.sender === "Me" ? "items-end" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{message.sender}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <Card
                    className={`p-3 ${message.sender === "Me" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <p>{message.content}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <Button asChild type="button" variant="ghost" size="icon">
              <Link href={"/join"} target="_blank">
                <Video className="w-4 h-4" />
              </Link>
            </Button>
            <Input
              placeholder="Send message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={chargeHandler} type="button" variant="outline">
              Pay
            </Button>
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
