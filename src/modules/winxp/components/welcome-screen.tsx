"use client"

import { motion } from "framer-motion"

export function WelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-700 via-blue-500 to-green-500 flex items-center justify-center"
    >
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="grid grid-cols-2 gap-1 w-16 h-16 transform -rotate-12 drop-shadow-2xl">
            <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-tl-full" />
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-tr-full" />
            <div className="bg-gradient-to-br from-blue-400 to-blue-700 rounded-bl-full" />
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-br-full" />
          </div>
          <span className="text-white text-5xl font-light">Windows</span>
          <span className="text-white text-5xl font-bold italic">XP</span>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2 }}
          className="h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2 }}
            className="h-full w-1/3 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
