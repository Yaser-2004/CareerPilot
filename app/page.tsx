import { ChatConversation } from "@/app/components/chat/ChatConversation";
import { ChatSidebar } from "@/app/components/chat/ChatSidebar";
import { JourneyPanel } from "@/app/components/chat/JourneyPanel";

export default function ChatPage() {
  return (
    <main className="flex h-screen overflow-hidden">
      <ChatSidebar />
      <ChatConversation />
      <JourneyPanel />
    </main>
  );
}