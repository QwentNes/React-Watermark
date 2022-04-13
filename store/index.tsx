import { createContext } from "react";
import { playground } from "./playground";
import { watermarks } from "./watermarks";

export const StoreContext = createContext({
    playground: new playground(),
    watermarks: new watermarks()
})