import * as motion from "motion/react-client";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1 className="text-4xl font-bold leading-tight">
        <motion.span
          className="inline-block"
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          간단하고,
        </motion.span>
        <motion.span
          className="inline-block ml-2"
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        >
          편리한
        </motion.span>
        <br />
        온라인 메모장을 만드는 중이에요.
      </h1>
    </div>
  );
}
