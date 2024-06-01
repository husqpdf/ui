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
        <div v-for="(_, index) in pdf.pages.value" :key="index" class="mb-4">
          <VuePDF
              :scale="previewScale"
              :pdf="pdf.pdf.value"
              :page="index + 1"
              class="!flex justify-center"
          />
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref} from "vue"
import {usePDF, VuePDF} from "@tato30/vue-pdf";
import {Skeleton} from "@/components/ui/skeleton";
import {Loader2, Minus, Plus} from "lucide-vue-next";
import DocumentDownload from "@/components/document-download/DocumentDownload.vue";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Mode, useLayoutMode} from "@/composables/useLayoutMode.ts";
import {useCurrentDocument} from "@/composables/useCurrentDocument.ts";
import {usePageData} from "@/composables/usePageData.ts";

type PreviewLayoutProps = {
  pending: boolean;
  pdfData: Uint8Array;
}

defineProps<PreviewLayoutProps>()

const currentDocument = useCurrentDocument()
const pageData = usePageData()

const genPdf = async () => {
  const pdfGenUrl = `http://localhost:3000/api/generate/${currentDocument}`

  const response = await fetch(pdfGenUrl, {
    method: "POST",
    body: JSON.stringify(pageData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const arrBuf = await response.arrayBuffer()
  const uintarr = new Uint8Array(arrBuf)
  return usePDF(uintarr)
}

const pdf = await genPdf()

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
