'use client'

import { motion } from 'framer-motion'
import { PiBinoculars } from 'react-icons/pi'

interface Props {
  title: string
  contentHtml: string
}

export default function AProposContent({ title, contentHtml }: Props) {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">{title}</h1>
        <motion.div
          className="text-betapower-azure opacity-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
        >
          <PiBinoculars size={64} />
        </motion.div>
      </div>
      <motion.article
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
