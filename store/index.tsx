import { createContext } from "react";
import { playground } from "./playground";
import { watermarks } from "./watermarks";
import { resource } from "./resource";

export const StoreContext = createContext({
    playground: new playground(),
    watermarks: new watermarks(),
    resource: new resource(),
})