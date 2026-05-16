'use strict'

const React = require('react')

// Animation prop names to strip so the underlying DOM element doesn't receive them
const ANIMATION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'viewport',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'onDragStart',
  'onDragEnd',
  'onAnimationStart',
  'onAnimationComplete',
])

function stripAnimationProps(props) {
  const cleaned = {}
  for (const key of Object.keys(props)) {
    if (!ANIMATION_PROPS.has(key)) {
      cleaned[key] = props[key]
    }
  }
  return cleaned
}

function createMotionComponent(tag) {
  const component = React.forwardRef(function MotionComponent(props, ref) {
    return React.createElement(tag, { ...stripAnimationProps(props), ref })
  })
  component.displayName = `motion.${tag}`
  return component
}

// Proxy so any motion.xyz access returns a valid forwardRef component
const motion = new Proxy(
  {},
  {
    get(_target, prop) {
      return createMotionComponent(prop)
    },
  }
)

function AnimatePresence({ children }) {
  return children
}
AnimatePresence.displayName = 'AnimatePresence'

module.exports = {
  motion,
  AnimatePresence,
  useInView: jest.fn(() => true),
  useAnimation: jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  })),
  useScroll: jest.fn(() => ({
    scrollX: { get: jest.fn(() => 0) },
    scrollY: { get: jest.fn(() => 0) },
    scrollXProgress: { get: jest.fn(() => 0) },
    scrollYProgress: { get: jest.fn(() => 0) },
  })),
  useTransform: jest.fn((_value, _input, _output) => ({ get: jest.fn(() => 0) })),
}
