import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client"

interface CardProps {
  href: string,
  src: string,
  alt: string,
  title: string,
  height?: number,
  font?: string,
}

function Card({ href, src, alt, title, height = 80, font = "text-2xl" }: CardProps) {
  return (
    <motion.div
      className="rounded-lg transition-shadow"
      whileHover={{ scale: 1.05, zIndex: 100 }}
      whileTap={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
    >
      <Link href={href}>
        <div className="relative overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            className={`w-full h-${height} object-cover rounded-md opacity-60 hover:opacity-100`}
          />
          <p className={`bg-linear-to-t from-card-500 to-card-500/0 absolute bottom-0 w-full p-2 text-center font-bold pointer-events-none ${font}`}>{title}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Card;