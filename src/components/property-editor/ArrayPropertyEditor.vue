<script setup lang="ts">
import {reactive} from "vue"
import {usePageData} from "@/composables/usePageData";
import {editorMapping} from "@/lib/editor-mapping";
import {ap, pathObj} from "@/lib/utils";
import {Braces, Brackets, CornerDownRight, Plus} from "lucide-vue-next";
import NestedPropertyButton from "./NestedPropertyButton.vue";
import PropertyEditorHeader from "./PropertyEditorHeader.vue";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

type ArrayPropertyEditorProps = {
   selection: EditorSelection<SchemaType>;
};
const props = defineProps<ArrayPropertyEditorProps>();
const pageData: any = usePageData();
const data: Array<any> = reactive(
   pathObj(props.selection.path, pageData) ?? [],
);
const itemSchema = props.selection.schema.items[0];
const isNestedArray =
   itemSchema.type === "array" || itemSchema.type === "object";
const addItem = () => {
   data.push(data[0]);
};
</script>

<template>
   <div class="space-y-2">
      <property-editor-header
         :type="itemSchema.type"
         :name="props.selection.name"
         :icon="Brackets"
      />

      <div v-if="isNestedArray">
         <div
            v-for="(_, index) in data"
            :key="ap(props.selection.path, index)"
            class="flex items-center gap-2"
         >
            <CornerDownRight class="size-4 text-zinc-500" />
            <nested-property-button
               :text="index.toString()"
               :subtext="itemSchema.type"
               :icon="itemSchema.type == 'object' ? Braces : Brackets"
               :schema="itemSchema"
               :path="ap(props.selection.path, index)"
               class="flex-1"
            />
         </div>
      </div>

      <div v-else>
         <div
            v-for="(_, index) in data"
            :key="ap(props.selection.path, index)"
            class="flex items-center gap-2 py-2"
         >
            <CornerDownRight class="size-4 text-zinc-500" />
            <Card class="flex-1 p-3">
               <component
                  :is="editorMapping[itemSchema.type]"
                  :selection="{
                     path: ap(props.selection.path, index),
                     schema: itemSchema,
                     name: `[${index}]`,
                  }"
               />
            </Card>
         </div>
      </div>

      <Button variant="ghost" class="ml-6 gap-x-2" size="xs" @click="addItem">
         <Plus class="size-4" />
         <span>Add element</span>
      </Button>
   </div>
</template>
