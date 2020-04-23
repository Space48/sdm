import * as action from "../action";
import Magento2, { SearchIdField } from "./client";

const idField: SearchIdField = {query: 'entity_id', response: 'id'};

export const actions = {
    list: (magento: Magento2) => action.source(magento.search('customers/search', {idField})),

    create: (magento: Magento2) => action.sink(customer => magento.post('customers', {customer})),
};

export type Customer = {
    id: number,
    group_id: number,
    default_billing: string,
    default_shipping: string,
    confirmation: string,
    created_at: string,
    updated_at: string,
    created_in: string,
    dob: string,
    email: string,
    firstname: string,
    lastname: string,
    middlename: string,
    prefix: string,
    suffix: string,
    gender: number,
    store_id: number,
    taxvat: string,
    website_id: number,
    addresses: Array<{
        id: number,
        customer_id: number,
        region: {
            region_code: string,
            region: string,
            region_id: number,
            extension_attributes: {}
        },
        region_id: number,
        country_id: string,
        street: Array<string>,
        company: string,
        telephone: string,
        fax: string,
        postcode: string,
        city: string,
        firstname: string,
        lastname: string,
        middlename: string,
        prefix: string,
        suffix: string,
        vat_id: string,
        default_shipping: boolean,
        default_billing: boolean,
        extension_attributes: {},
        custom_attributes: Array<{
            attribute_code: string,
            value: string
        }>
    }>,
    disable_auto_group_change: number,
    extension_attributes: {
        company_attributes: {
            customer_id: number,
            company_id: number,
            job_title: string,
            status: number,
            telephone: string,
            extension_attributes: {}
        },
        is_subscribed: boolean,
        amazon_id: string,
        vertex_customer_code: string
    },
    custom_attributes: Array<{
        attribute_code: string,
        value: string
    }>
};