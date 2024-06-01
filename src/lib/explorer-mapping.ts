import SchemaProperty from "@/components/schema-explorer/SchemaProperty.vue";
import SchemaGroup from "@/components/schema-explorer/SchemaObject.vue";
import SchemaArray from "@/components/schema-explorer/SchemaArray.vue";

export const explorerMapping = {
   object: SchemaGroup,
   array: SchemaArray,
   string: SchemaProperty,
   integer: SchemaProperty,
   boolean: SchemaProperty,
};
