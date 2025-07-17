import {onUnmounted, watch, WatchCallback, WatchSource, WatchStopHandle} from 'vue';

/**
 * Creates a debounced watcher in Vue 3.
 * The callback will only be invoked after the specified delay since the last change to the source.
 *
 * @template T - The type of the value being watched.
 * @param {WatchSource<T>} source - The reactive source to watch (e.g., a ref, reactive object, or a getter function).
 * @param {WatchCallback<T>} callback - The callback function to execute after the debounce delay.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {WatchStopHandle} A function that can be called to stop the watcher manually.
 */
export const watchDebounce = <T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  delay: number = 500
): WatchStopHandle => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const unwatch = watch(source, (newValue, oldValue) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(newValue, oldValue, () => null);
    }, delay);
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    unwatch();
  });

  return unwatch;
};
