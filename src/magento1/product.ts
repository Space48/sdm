import * as action from "../action";
import Magento1 from "./client";

const idField =  'entity_id';

export const actions = {
    list: (magento: Magento1) => action.source(magento.search('products', {idField})),

    get: (magento: Magento1) => action.map((productId: string|number) => magento.get(`products/${productId}`)),
};
