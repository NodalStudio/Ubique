import * as wasm from "./ubique_wasm_bg.wasm";
export * from "./ubique_wasm_bg.js";
import { __wbg_set_wasm } from "./ubique_wasm_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
