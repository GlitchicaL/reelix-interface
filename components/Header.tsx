import * as motion from "motion/react-client";
import { User } from "./icons";

export function Header() {
  return (
    <header className="pt-8 pb-4 flex justify-between place-items-center">
      <div className="company">
        <p className="text-3xl text-center font-carter">
          <a href="/">
            Reelix
          </a>
        </p>
      </div>

      <div className="flex">
        <motion.a
          href="/preferences"
          initial={{ scale: 0.80, zIndex: 100 }}
          whileHover={{ scale: 1, zIndex: 100 }}
          whileTap={{ scale: 0.80 }}
          className="cursor-pointer"
        >
          <User />
        </motion.a>
      </div>
    </header>
  );
}