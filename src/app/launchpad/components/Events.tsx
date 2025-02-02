"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingEvents = [
  { title: "Investor Meeting", date: "2023-06-15", time: "14:00" },
  { title: "Pitch Practice Session", date: "2023-06-18", time: "10:00" },
  { title: "Startup Conference", date: "2023-06-22", time: "09:00" },
];

export default function Events() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
      <ul className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-xs text-gray-500">
                {event.date} at {event.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="link" className="mt-4 w-full">
        View Full Calendar
      </Button>
    </div>
  );
}
