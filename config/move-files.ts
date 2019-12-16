//@ts-ignore
import copyDir from "copy-dir";
import { resolve } from "path";
import { mkdirSync } from "fs";

const from = resolve(__dirname, "../node_modules/@types/sortablejs");
const to = resolve(__dirname, "../dist/node_modules/@types/sortablejs");

mkdirSync(to, { recursive: true });

copyDir.sync(from, to);
