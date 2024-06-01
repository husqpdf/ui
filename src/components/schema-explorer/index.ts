import SchemaExplorer from "./SchemaExplorer.vue";

export type SchemaExplorerProps = {
   schema: SchemaType;
   name: string;
   level: number;
   path: string;
};

export {
   SchemaExplorer
}