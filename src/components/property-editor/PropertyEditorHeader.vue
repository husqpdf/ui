<script setup lang="ts">
import {type LucideIcon} from "lucide-vue-next";

type PropertyEditorHeaderProps = {
   name: string;
   type: string;
   icon: LucideIcon;
};

const props = defineProps<PropertyEditorHeaderProps>();
</script>

<template>
   <div class="flex items-center gap-2">
      <component :is="props.icon" class="size-4 text-primary" />
      <span class="flex-1 text-sm">{{ props.name }}</span>
      <code class="text-xs">{{ props.type }}</code>
   </div>
</template>
