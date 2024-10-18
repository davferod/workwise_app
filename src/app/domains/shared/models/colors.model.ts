export type Colors = 'success' | 'primary' | 'danger' | 'light' | 'sky' | 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'violet' | 'pink' | 'gray' | 'sky'

export type ObjColors = Record<Colors, Record<string, boolean>>

export const COLORS = {
  blue: {
    'bg-blue-500': true,
    'hover:bg-blue-700': true,
    'focus:bg-blue-600': true,
    'text-white': true,
  },
  green: {
    'bg-green-500': true,
    'hover:bg-green-800': true,
    'focus:bg-green-300': true,
    'text-white': true,
  },
  red: {
    'bg-red-500': true,
    'hover:bg-red-800': true,
    'focus:bg-red-300': true,
    'text-white': true,
  },
  light: {
    'bg-gray-400': true,
    'hover:bg-gray-500': true,
    'focus:bg-gray-50': true,
    'text-gray-800': true,
  },
  yellow: {
    'bg-yellow-600': true,
    'hover:bg-yellow-800': true,
    'focus:bg-yellow-300': true,
    'text-white': true,
  },
  indigo: {
    'bg-indigo-600': true,
    'hover:bg-indigo-800': true,
    'focus:bg-indigo-300': true,
    'text-white': true,
  },
  violet: {
    'bg-violet-500': true,
    'hover:bg-violet-800': true,
    'focus:bg-violet-300': true,
    'text-white': true,
  },
  pink: {
    'bg-pink-600': true,
    'hover:bg-pink-800': true,
    'focus:bg-pink-300': true,
    'text-white': true,
  },
  gray: {
    'bg-gray-600': true,
    'hover:bg-gray-800': true,
    'focus:bg-gray-300': true,
    'text-white': true,
  },
  sky: {
    'bg-sky-600': true,
    'hover:bg-sky-800': true,
    'focus:bg-sky-300': true,
    'text-white': true,
  },
  success: {
    'bg-success-500':true,
    'hover:bg-success-700': true,
    'focus:bg-success-600': true,
    'text-white': true,
  },
  primary: {
    'bg-primary-300': true,
    'hover:bg-primary-800': true,
    'focus:bg-primary-300': true,
    'text-white': true,
  },
  danger: {
    'bg-danger-300': true,
    'hover:bg-danger-800': true,
    'focus:bg-danger-300': true,
    'text-white': true,
  },
}

export const BACKGROUNDS: ObjColors = {
  blue: {
    'bg-blue-600': true,
  },
  green: {
    'bg-green-600': true,
  },
  red: {
    'bg-red-600': true,
  },
  light: {
    'bg-gray-600': true,
  },
  yellow: {
    'bg-yellow-600': true,
  },
  indigo: {
    'bg-indigo-600': true,
  },
  violet: {
    'bg-violet-400': true,
  },
  pink: {
    'bg-pink-600': true,
  },
  gray: {
    'bg-gray-600': true,
  },
  sky: {
    'bg-sky-600': true,
  },
  success: {
    'bg-success-600':true,
  },
  primary: {
    'bg-primary-600': true,
  },
  danger: {
    'bg-danger-600': true,
  },
}

export const NAVBAR_BACKGROUNDS: ObjColors = {
  blue: {
    'bg-blue-700': true,
  },
  green: {
    'bg-green-700': true,
  },
  red: {
    'bg-red-700': true,
  },
  light: {
    'bg-gray-700': true,
  },
  yellow: {
    'bg-yellow-700': true,
  },
  indigo: {
    'bg-indigo-700': true,
  },
  violet: {
    'bg-violet-700': true,
  },
  pink: {
    'bg-pink-700': true,
  },
  gray: {
    'bg-gray-700': true,
  },
  sky: {
    'bg-sky-700': true,
  },
  success: {
    'bg-success-700':true,
  },
  primary: {
    'bg-primary-700': true,
  },
  danger: {
    'bg-danger-700': true,
  },
}
