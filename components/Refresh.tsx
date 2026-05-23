import * as motion from "motion/react-client";
import { Refresh as RefreshIcon } from "@/components/icons";

export default function Refresh() {
  return (
    <motion.button
      initial={{ scale: 0.80, zIndex: 100 }}
      whileHover={{ scale: 1, zIndex: 100 }}
      whileTap={{ scale: 0.80 }}
      className="cursor-pointer"
    >
      <RefreshIcon />
    </motion.button>
  );
}