import * as motion from "motion/react-client";
import { Refresh as RefreshIcon } from "@/components/icons";

export default function Refresh() {
  return (
    <motion.button
      initial={{ scale: 0.50, zIndex: 100 }}
      whileHover={{ scale: 0.75, zIndex: 100 }}
      whileTap={{ scale: 0.50 }}
      className="cursor-pointer"
    >
      <RefreshIcon />
    </motion.button>
  );
}