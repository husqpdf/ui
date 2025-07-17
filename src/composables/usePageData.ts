import {useCurrentDocument} from "@/composables/useCurrentDocument.ts";

export function usePageData<T>(): T {
   const document = useCurrentDocument();
   const key = `__hqpdf_page_state_${document}`
   const stringValue = localStorage.getItem(key);
   const value = stringValue ? JSON.parse(stringValue) : undefined;
   return value as T;
}
