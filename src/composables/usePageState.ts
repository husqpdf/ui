import {inject, onMounted, ref, type Ref, watch} from 'vue';
import {useCurrentDocument} from "@/composables/useCurrentDocument";
import {watchDebounce} from "@/lib/watchDebounced.ts";

/**
 * Parses a dot/bracket notation path string into an array of keys/indices.
 * Examples:
 * - "user.profile.name" -> ["user", "profile", "name"]
 * - "items[0].value" -> ["items", 0, "value"]
 * @param path The path string to parse.
 * @returns An array of string keys or number indices.
 */
const parsePath = (path: string): (string | number)[] => {
  // Split by dot or brackets, then filter out empty strings
  return path.split(/[\.\[\]]/).filter(p => p !== '').map(p => {
    const num = Number(p);
    // If it's a valid number, use it as a number, otherwise keep as string
    return isNaN(num) ? p : num;
  });
};

/**
 * Gets a nested value from an object using a parsed path array.
 * @param obj The object to traverse.
 * @param pathParts An array of keys/indices representing the path.
 * @returns The value at the specified path, or undefined if not found.
 */
const getNestedValue = (obj: any, pathParts: (string | number)[]): any => {
  let current = obj;
  for (const part of pathParts) {
    if (current === null || typeof current !== 'object' || !(part in current)) {
      return undefined;
    }
    current = current[part];
  }
  return current;
};

/**
 * Sets a nested value in an object using a parsed path array.
 * This function mutates the original object.
 * @param obj The object to modify.
 * @param pathParts An array of keys/indices representing the path.
 * @param value The value to set.
 */
const setNestedValue = (obj: any, pathParts: (string | number)[], value: any): void => {
  let current = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    const nextPart = pathParts[i + 1];

    if (current[part] === undefined || current[part] === null) {
      // If the next part is a number (array index), initialize as an array
      // Otherwise, initialize as an object
      current[part] = typeof nextPart === 'number' ? [] : {};
    }
    current = current[part];
  }
  current[pathParts[pathParts.length - 1]] = value;
};

/**
 * A Vue 3 composable that makes a specific part of a localStorage object reactive.
 *
 * @param dotNotationPath The dot-notation path to the specific property within the object (e.g., "user.profile.username", "items[0].name").
 * @param defaultValue An optional default value to use if the key or path doesn't exist in localStorage.
 * @returns A Ref<T> that is reactive and synchronized with localStorage.
 */
export function usePageState<T>(
  dotNotationPath: string,
  defaultValue: T
): Ref<T> {
  const document = useCurrentDocument()
  const key = `__hqpdf_page_state_${document}`
  const reactiveValue = ref<T>(defaultValue);
  const pathParts = parsePath(dotNotationPath);
  const editorStateChange = inject<EditorStateChangeProvider>("__hqpdf_state_change")

  onMounted(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsedData = JSON.parse(item);
          const valueAtPath = getNestedValue(parsedData, pathParts);
          if (valueAtPath !== undefined) {
            reactiveValue.value = valueAtPath;
          }
        }
      } catch (e) {
        console.error(`[useLocalStorageReactive] Error parsing localStorage item for key "${key}":`, e);
      }
    }
  });

  watch(reactiveValue, (newValue) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        let currentFullObject: any = JSON.parse(window.localStorage.getItem(key) || '{}');
        setNestedValue(currentFullObject, pathParts, newValue);
        window.localStorage.setItem(key, JSON.stringify(currentFullObject));
      } catch (e) {
        console.error(`[useLocalStorageReactive] Error setting localStorage item for key "${key}" and path "${dotNotationPath}":`, e);
      }
    }
  }, { deep: true });

  watchDebounce(reactiveValue, () => {
    editorStateChange?.onEditorStateChange()
  })

  return reactiveValue as Ref<T>;
}
