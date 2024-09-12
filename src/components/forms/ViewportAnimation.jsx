import { motion } from "framer-motion";

const ViewportAnimation = ({children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 , y: 100 }}
        whileInView={{ opacity: 1, y: 0, transition: {
            type: "spring",
            bounce: 0.1,
            duration: 0.8
          }}}
        viewport={{ once: true }}
      >
        {children }
        </motion.div>
    </>
  );
};
export default ViewportAnimation;
