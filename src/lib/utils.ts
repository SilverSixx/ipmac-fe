import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

/**
 * Converts Vue component emits to props for use with component events
 * Useful for components that accept event handlers as props
 * @param emit The emit function from the setup context
 * @returns An object with handler functions that can be spread as props
 */
export function useEmitAsProps(emit: any) {
  return new Proxy(
    {},
    {
      get: (_, event) => {
        return (...args: any[]) => emit(event, ...args)
      }
    }
  )
}