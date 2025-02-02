import { recentActivity } from "@/lib/constants/activity";
import { ChevronRight } from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {recentActivity.map((activity, index) => (
          <li key={index} className="flex items-start space-x-3">
            <activity.icon className="h-6 w-6 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.content}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  );
}
