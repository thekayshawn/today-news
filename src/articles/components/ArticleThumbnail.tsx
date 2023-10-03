import { motion } from "framer-motion";
import { MotionComponentProps } from "~/utils/types";

export default function ArticleThumbnail({
  children,
  ...props
}: MotionComponentProps) {
  return (
    <motion.div className="app-article__thumbnail" {...props}>
      {children}
    </motion.div>
  );
}
