import { quickActions } from "@/lib/constants/actions"; // Adjust path if necessary
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center"
            onClick={() => router.push(action.href)}
          >
            {action.icon && <action.icon className="h-6 w-6 mb-2" />}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
