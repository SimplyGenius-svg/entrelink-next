import { MessageSquare, FileText, Users, PieChart } from "lucide-react";

export const recentActivity = [
  {
    type: "message",
    content: "New message from TechVentures Capital",
    time: "2 hours ago",
    icon: MessageSquare,
  },
  {
    type: "analysis",
    content: "Your latest pitch deck analysis is ready",
    time: "5 hours ago",
    icon: FileText,
  },
  {
    type: "investor",
    content: "New investor match: Green Future Fund",
    time: "1 day ago",
    icon: Users,
  },
  {
    type: "pitch",
    content: "Your pitch deck was viewed by 3 investors",
    time: "2 days ago",
    icon: PieChart,
  },
];
