import BigCommerce from "./client";
import { source } from "@space48/json-pipe";

export const actions = {
    get: (bigCommerce: BigCommerce) => source(bigCommerce.get('v2/store').then(r => [r])),
};
