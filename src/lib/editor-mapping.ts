import ObjectPropertyEditor from "@/components/property-editor/ObjectPropertyEditor.vue";
import ArrayPropertyEditor from "@/components/property-editor/ArrayPropertyEditor.vue";
import PrimitivePropertyEditor from "@/components/property-editor/PrimitivePropertyEditor.vue";

export const editorMapping = {
   object: ObjectPropertyEditor,
   array: ArrayPropertyEditor,
   string: PrimitivePropertyEditor,
   integer: PrimitivePropertyEditor,
   boolean: PrimitivePropertyEditor,
};
