import * as action from "../action";
import Magento1 from "./client";

const idField =  'entity_id';

export const actions = {
    list: (magento: Magento1) => action.source(magento.search('customers', {idField})),
};
