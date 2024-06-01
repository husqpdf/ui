<script setup lang="ts">
import {useBindUrl} from "@/composables/useBindUrl";
import {TextCursorInput} from "lucide-vue-next";
import PropertyEditorHeader from "./PropertyEditorHeader.vue";
import {Input} from "@/components/ui/input";

type PrimitivePropertyEditorProps = {
   selection: EditorSelection<SchemaType>;
};
const props = defineProps<PrimitivePropertyEditorProps>();
const { query, updateQueryParam } = useBindUrl(props.selection.path);
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
         v-model="query"
         :placeholder="props.selection.name"
         @input="updateQueryParam"
      />
   </div>
</template>

<style scoped></style>
