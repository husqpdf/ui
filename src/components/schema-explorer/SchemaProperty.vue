<script setup lang="ts">
import SchemaElementButton from "@/components/schema-explorer/SchemaElementButton.vue";
import {TextCursorInput} from "lucide-vue-next";
import type {SchemaExplorerProps} from "./";

const props = defineProps<SchemaExplorerProps>();
</script>

<template>
   <schema-element-button
      :text="props.name"
      :level="props.level"
      :icon="TextCursorInput"
      :subtext="schema.type"
      :schema="props.schema"
      :path="props.path"
   />
</template>

<style scoped></style>
