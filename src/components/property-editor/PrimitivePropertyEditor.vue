<script setup lang="ts">
import {TextCursorInput} from "lucide-vue-next";
import PropertyEditorHeader from "./PropertyEditorHeader.vue";
import {Input} from "@/components/ui/input";
import {usePageState} from "@/composables/usePageState.ts";

type PrimitivePropertyEditorProps = {
   selection: EditorSelection<SchemaType>;
};

const props = defineProps<PrimitivePropertyEditorProps>();
const value = usePageState<string>(props.selection.path, "")
</script>

<template>
   <div class="space-y-0.5">
      <property-editor-header
         :name="props.selection.name"
         :type="props.selection.schema.type"
         :icon="TextCursorInput"
      />

      <span
         v-if="props.selection.schema.description"
         class="text-xs text-zinc-500"
      >
         {{ props.selection.schema.description }}
      </span>

      <Input
         v-model="value"
         :placeholder="props.selection.name"
      />
   </div>
</template>

<style scoped></style>
