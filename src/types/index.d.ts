declare module 'qs';

type SchemaType = {
    type: "array" | "string" | "integer" | "object";
    description?: string;
    properties: Record<string, SchemaType>;
    items: SchemaType[];
}

type EditorSelection<T extends SchemaType> = {
    name: string;
    path: string;
    schema: T;
};

type EditorSelectionProvider = {
    selection: Ref<EditorSelection<SchemaType>>;
    setSelection: (selection: EditorSelection<SchemaType>) => void;
};
