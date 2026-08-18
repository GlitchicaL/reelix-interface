import * as motion from "motion/react-client";
import { ArrowLeft } from "@/components/icons";

interface BackProps {
  action: () => void;
}

export default function Back({ action }: BackProps) {
  return (
    <motion.button
      onClick={() => action()}
      initial={{ scale: 0.60, zIndex: 100 }}
      whileHover={{ scale: 0.75, zIndex: 100 }}
      whileTap={{ scale: 0.60 }}
      className="cursor-pointer ml-[-6px]"
    >
      <ArrowLeft />
    </motion.button>
  );
}