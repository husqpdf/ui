<template>
   <schema-element-button
      :text="props.name"
      :subtext="schema.type"
      :icon="Brackets"
      :level="props.level"
      :path="props.path"
      :collapsable="false"
      :schema="props.schema"
   />
</template>

<script setup lang="ts">
import SchemaElementButton from "./SchemaElementButton.vue";
import {Brackets} from "lucide-vue-next";
import type {SchemaExplorerProps} from "./";

const props = defineProps<SchemaExplorerProps>();
</script>

<style scoped></style>
