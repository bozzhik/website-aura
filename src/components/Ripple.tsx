import {motion} from 'framer-motion'
import {cn} from '../utils'

export default function Ripple({className}: {className?: string}) {
  const rippleVariants = {
    start: {
      opacity: 1,
      scale: 0,
    },
    end: {
      opacity: 0,
      scale: 3,
    },
  }

  const rippleTransition = {
    duration: 2,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatDelay: 2,
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative size-20">
        {Array.from({length: 3}).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full rounded-full opacity-0 bg-gradient-to-t from-primary-light via-primary to-primary-dark"
            variants={rippleVariants}
            initial="start"
            animate="end"
            transition={{
              ...rippleTransition,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  )
}
