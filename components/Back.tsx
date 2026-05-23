import * as motion from "motion/react-client";
import { ArrowLeft } from "@/components/icons";

interface BackProps {
  action: () => void;
}

export default function Back({ action }: BackProps) {
  return (
    <motion.button
      onClick={() => action()}
      initial={{ scale: 0.80, zIndex: 100 }}
      whileHover={{ scale: 1, zIndex: 100 }}
      whileTap={{ scale: 0.80 }}
      className="cursor-pointer"
    >
      <ArrowLeft />
    </motion.button>
  );
}