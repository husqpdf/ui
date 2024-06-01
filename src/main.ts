import {type App} from "vue"
import DevelopLayout from "@/layouts/DevelopLayout.vue";
import PreviewLayout from "@/layouts/PreviewLayout.vue";
import {useLayoutMode} from "@/composables/useLayoutMode.ts";
import {usePageData} from "@/composables/usePageData.ts";
import {useCurrentDocument} from "@/composables/useCurrentDocument.ts";
import "./style.css"

export default {
    install: (app: App) => {
        app.component("husq-dev-layout", DevelopLayout)
        app.component("husq-preview-layout", PreviewLayout)
    }
}

export {
    usePageData,
    useLayoutMode,
    useCurrentDocument,
}