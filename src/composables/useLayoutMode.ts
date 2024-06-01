import {computed, Ref} from "vue";
import {useRoute} from "vue-router";

export enum Mode {
   PREVIEW = "preview",
   DEVELOP = "develop",
   RENDER = "default",
}

export function useLayoutMode(): Ref<Mode> {
   const route = useRoute();

   const hash = computed(() => route.hash);

   return computed(() => {
      switch (hash.value) {
         case "#preview":
            return Mode.PREVIEW;
         case "#develop":
            return Mode.DEVELOP;
         default:
            return Mode.RENDER;
      }
   });
};
