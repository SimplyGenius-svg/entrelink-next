import { motion } from "framer-motion";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative w-10 h-5 flex items-center rounded-full transition ${
        checked ? "bg-[#8C1515]" : "bg-gray-300"
      }`}
      aria-checked={checked}
      role="switch"
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-md"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        animate={{
          x: checked ? 20 : 0,
        }}
      />
    </button>
  );
}
