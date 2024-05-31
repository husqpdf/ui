import type {App} from "vue"
import { MyCustomComponent } from "./components"
import "./style.css"

export default {
    install: (app: App) => {
        app.component("MyCustomComponent", MyCustomComponent)
    }
}

export {
    MyCustomComponent
}