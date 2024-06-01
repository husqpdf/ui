<template>
  <div class="size-full">
    <ScrollArea
        :class="isInPreviewMode ? 'h-screen' : 'h-full'"
        class="bg-muted dark:bg-card"
    >
      <div
          v-if="pending"
          class="absolute left-1/2 z-10 mt-6 -translate-x-1/2"
      >
        <div
            class="flex items-center gap-2 rounded-full border bg-background p-2 px-4 animate-in slide-in-from-top-3"
        >
          <Loader2 class="size-3 animate-spin text-primary" />
          <span class="text-sm">Refreshing document...</span>
        </div>
      </div>

      <div class="absolute bottom-4 left-4 z-10">
        <DocumentDownload />
      </div>

      <div
          class="absolute bottom-4 right-4 z-10 flex w-fit flex-col gap-0.5"
      >
        <Button
            variant="outline"
            class="h-fit p-2"
            @click="modifyPreviewScale(0.1)"
        >
          <Plus class="size-4" />
        </Button>
        <Button
            variant="outline"
            class="h-fit p-2"
            @click="modifyPreviewScale(-0.1)"
        >
          <Minus class="size-4" />
        </Button>
      </div>

      <div v-if="pending && !pdf" class="space-y-4 p-8">
        <Skeleton class="mx-auto h-[842px] w-[595px]" />
        <Skeleton class="mx-auto h-[842px] w-[595px]" />
      </div>

      <div v-else class="p-8 drop-shadow-md">
        <div v-for="(_, index) in pages" :key="index" class="mb-4">
          <VuePDF
              :scale="previewScale"
              :pdf="pdf"
              :page="index + 1"
              class="!flex justify-center"
          />
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, Ref} from "vue"
import {Skeleton} from "@/components/ui/skeleton";
import {Loader2, Minus, Plus} from "lucide-vue-next";
import DocumentDownload from "@/components/document-download/DocumentDownload.vue";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Mode, useLayoutMode} from "@/composables/useLayoutMode.ts";
import {PDFSrc, usePDF, VuePDF} from "@tato30/vue-pdf";

type PreviewLayoutProps = {
  pending: boolean;
  base64: string;
}

const props = defineProps<PreviewLayoutProps>()
const src = computed<PDFSrc>(() => ({ data: atob(props.base64) }))
const {pages, pdf} = usePDF(src);

const isInPreviewMode: Ref<boolean> = ref(
    useLayoutMode().value == Mode.PREVIEW,
);

const previewScale: Ref<number> = ref(1);
const modifyPreviewScale = (mod: number) => {
  const newScale = previewScale.value + mod;
  if (newScale >= 0.2 && newScale <= 2) {
    previewScale.value = newScale;
  }
};
</script>
