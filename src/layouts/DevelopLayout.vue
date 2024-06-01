<script setup lang="ts">
import {provide, ref} from "vue"
import {explorerMapping} from "@/lib/explorer-mapping";
import {editorMapping} from "@/lib/editor-mapping.ts";
import {Separator} from "@/components/ui/separator";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useCurrentDocument} from "@/composables/useCurrentDocument.ts";
import AppHeader from "@/components/header/AppHeader.vue";
import {TooltipProvider} from "@/components/ui/tooltip";

const props = defineProps<{ schema?: SchemaType }>()
const schema = props.schema ?? {} as SchemaType
const documentName = useCurrentDocument() ?? "unnamed";

const storedSelectionString = localStorage.getItem("__hqpdf_selection");
const storedSelection = JSON.parse(storedSelectionString ?? "null");
const selectionRef = ref<EditorSelection<SchemaType>>(storedSelection);

provide<EditorSelectionProvider>("__hqpdf_selection", {
  selection: selectionRef,
  setSelection: (v: EditorSelection<SchemaType>) => {
    selectionRef.value = v;
    localStorage.setItem("__hqpdf_selection", JSON.stringify(v));
  },
});
</script>

<template>
  <TooltipProvider>
    <div class="bg-background text-foreground">
      <div class="flex h-screen flex-col px-4 pb-4">
        <AppHeader />
        <ResizablePanelGroup
            direction="horizontal"
            class="flex-1 rounded-lg border"
        >
          <ResizablePanel :default-size="25">
            <div class="h-full space-y-4 overflow-y-auto p-4 text-sm">
              <h2>Schema Explorer</h2>
              <Separator />
              <div>
                <component
                    :is="explorerMapping[schema.type]"
                    :schema="schema"
                    :level="0"
                    :name="documentName"
                    path=""
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />
          <ResizablePanel :default-size="50">
            <slot />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel :default-size="25">
            <div class="h-full space-y-4 overflow-y-auto p-4">
              <h2 class="text-sm">Property editor</h2>
              <Separator />
              <div v-if="selectionRef">
                <component
                    :is="editorMapping[selectionRef.schema.type]"
                    :key="selectionRef.path"
                    :selection="selectionRef"
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  </TooltipProvider>
</template>
