<script setup lang="ts">
import {inject, ref, watch} from "vue"
import {ChevronDown, ChevronRight, type LucideIcon} from "lucide-vue-next";
import {cn} from "@/lib/utils/ui";
import {Button} from "@/components/ui/button";

type SchemaElementButtonProps = {
   text: string;
   subtext: string;
   schema: SchemaType;
   level: number;
   icon: LucideIcon;
   isOpen?: boolean;
   collapsable?: boolean;
   path: string;
};
const props = defineProps<SchemaElementButtonProps>();
const selection = inject<EditorSelectionProvider>("__hqpdf_selection");
const select = () => {
   selection?.setSelection({
      path: props.path,
      schema: props.schema,
      name: props.text,
   });
};
const getIsSelected = () => selection?.selection.value?.path === props.path;
const isSelected = ref(getIsSelected());
watch(
   () => selection?.selection.value,
   () => {
      isSelected.value = getIsSelected();
   },
);
</script>

<template>
   <div
      :style="{ paddingLeft: props.level * 1.25 + 'rem' }"
      class="flex h-7 w-full select-none items-center rounded pr-4"
   >
      <Button
         v-if="props.collapsable"
         variant="ghost"
         size="xs"
         class="transition-none"
         @click="$emit('collapse')"
      >
         <ChevronRight v-if="!props.isOpen" class="size-4 text-zinc-500" />
         <ChevronDown v-else class="size-4 text-zinc-500" />
      </Button>
      <div v-else class="size-8" />

      <Button
         variant="ghost"
         size="xs"
         :class="
            cn(
               'flex flex-1 justify-start gap-x-2 transition-none',
               isSelected && 'bg-accent',
            )
         "
         @click="select"
      >
         <component :is="props.icon" class="size-4 text-primary" />
         <span class="flex-1 text-left">{{ props.text }}</span>
         <span class="font-mono text-xs !font-normal text-zinc-500">{{
            props.subtext
         }}</span>
      </Button>
   </div>
</template>
