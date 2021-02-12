export interface paths {
    "/customers": {
        get: operations["CustomersGet"];
        put: operations["CustomersPut"];
        post: operations["CustomersPost"];
        delete: operations["CustomersDelete"];
    };
    "/customers/addresses": {
        get: operations["CustomersAddressesGet"];
        put: operations["CustomersAddressesPut"];
        post: operations["CustomersAddressesPost"];
        delete: operations["CustomersAddressesDelete"];
    };
    "/customers/attributes": {
        get: operations["CustomersAttributesGet"];
        put: operations["CustomersAttributesPut"];
        post: operations["CustomersAttributesPost"];
        delete: operations["CustomersAttributesDelete"];
    };
    "/customers/attribute-values": {
        get: operations["CustomersAttributeValuesGet"];
        put: operations["CustomersAttributeValuesPut"];
        delete: operations["CustomersAttributeValuesDelete"];
    };
    "/customers/form-field-values": {
        get: operations["CustomerFormFieldsGet"];
        put: operations["CustomerFormFieldValuePUT"];
    };
    "/customers/{customerId}/consent": {
        get: operations["CustomersConsentByCustomerId_GET"];
        put: operations["CustomersConsentByCustomerId_PUT"];
    };
}
export interface definitions {
    Pagination: {
        total?: number;
        count?: number;
        per_page?: number;
        current_page?: number;
        total_pages?: number;
        links?: {
            previous?: string;
            current?: string;
            next?: string;
        };
    };
    _metaCollection: {
        pagination?: {
            total?: number;
            count?: number;
            per_page?: number;
            current_page?: number;
            total_pages?: number;
            links?: {
                previous?: string;
                current?: string;
                next?: string;
            };
        };
    };
    ErrorResponse: {
        status?: number;
        title?: string;
        type?: string;
        instance?: string;
        errors?: {
            [key: string]: string;
        };
    };
    _error: {
        status?: number;
        title?: string;
        type?: string;
        instance?: string;
    };
    customer_Full: {
        email?: string;
        first_name?: string;
        last_name?: string;
        company?: string;
        phone?: string;
        registration_ip_address?: string;
        notes?: string;
        tax_exempt_category?: string;
        customer_group_id?: number;
        id?: number;
        date_modified?: string;
        date_created?: string;
        address_count?: number;
        attribute_count?: number;
        authentication?: {
            force_password_reset?: boolean;
        };
        addresses?: {
            first_name: string;
            last_name: string;
            company?: string;
            address1: string;
            address2?: string;
            city: string;
            state_or_province: string;
            postal_code: string;
            country_code: string;
            phone?: string;
            address_type?: "residential" | "commercial";
            customer_id: number;
            id: number;
            country?: string;
            form_fields?: (({
                name: string;
                value: string | number | string[];
            } & {
                customer_id: number;
            }) | ({
                name: string;
                value: string | number | string[];
            } & {
                address_id: number;
            }))[];
        }[];
        attributes?: {
            attribute_id: number;
            value: string;
            id?: number;
            customer_id: number;
            date_modified?: string;
            date_created?: string;
        }[];
        form_fields?: (({
            name: string;
            value: string | number | string[];
        } & {
            customer_id: number;
        }) | ({
            name: string;
            value: string | number | string[];
        } & {
            address_id: number;
        }))[];
        store_credit_amounts?: {
            amount?: number;
        }[];
        accepts_product_review_abandoned_cart_emails?: boolean;
        channel_ids?: definitions["customerChannelIds"];
    };
    customer_Post: {
        email: string;
        first_name: string;
        last_name: string;
        company?: string;
        phone?: string;
        notes?: string;
        tax_exempt_category?: string;
        customer_group_id?: number;
        addresses?: {
            first_name: string;
            last_name: string;
            company?: string;
            address1: string;
            address2?: string;
            city: string;
            state_or_province: string;
            postal_code: string;
            country_code: string;
            phone?: string;
            address_type?: "residential" | "commercial";
        }[];
        attributes?: definitions["customerAttributes_Base"][];
        authentication?: {
            force_password_reset?: boolean;
            new_password?: string;
        };
        accepts_product_review_abandoned_cart_emails?: boolean;
        store_credit_amounts?: {
            amount?: number;
        }[];
    };
    customer_Put: {
        email?: string;
        first_name?: string;
        last_name?: string;
        company?: string;
        phone?: string;
        registration_ip_address?: string;
        notes?: string;
        tax_exempt_category?: string;
        customer_group_id?: number;
        id: number;
        authentication?: {
            force_password_reset?: boolean;
            new_password?: string;
        };
        accepts_product_review_abandoned_cart_emails?: boolean;
        store_credit_amounts?: {
            amount?: number;
        }[];
    };
    attributeValue_Full: definitions["attribueValue_Base"] & {
        date_modified?: string;
        date_created?: string;
    };
    attribueValue_Base: {
        id?: number;
        attribute_id: number;
        value: string;
        customer_id: number;
    };
    customerAttributeValue_Full: {
        attribute_id: number;
        attribute_value: string;
    };
    attribute_Full: {
        name: string;
        type: "string" | "number" | "date";
        id: number;
        date_modified?: string;
        date_created?: string;
    };
    attribute_Put: {
        name: string;
        id: number;
    };
    attribute_Post: {
        name: string;
        type: "string" | "number" | "date";
    };
    address_Full: {
        first_name: string;
        last_name: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        state_or_province: string;
        postal_code: string;
        country_code: string;
        phone?: string;
        address_type?: "residential" | "commercial";
        customer_id: number;
        id: number;
        country?: string;
        form_fields?: (({
            name: string;
            value: string | number | string[];
        } & {
            customer_id: number;
        }) | ({
            name: string;
            value: string | number | string[];
        } & {
            address_id: number;
        }))[];
    };
    address_Put: {
        first_name: string;
        last_name: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        state_or_province: string;
        postal_code: string;
        country_code: string;
        phone?: string;
        address_type?: "residential" | "commercial";
        customer_id: number;
        id: number;
    };
    address_Post: {
        first_name: string;
        last_name: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        state_or_province: string;
        postal_code: string;
        country_code: string;
        phone?: string;
        address_type?: "residential" | "commercial";
        customer_id: number;
    };
    customerAddresses_Base: {
        first_name: string;
        last_name: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        state_or_province: string;
        postal_code: string;
        country_code: string;
        phone?: string;
        address_type?: "residential" | "commercial";
    };
    customerAuthentication_PostPut: {
        force_password_reset?: boolean;
    } & {
        new_password?: string;
    };
    customerAuthentication_Base: {
        force_password_reset?: boolean;
    };
    addressType: "residential" | "commercial";
    Links: {
        previous?: string;
        current?: string;
        next?: string;
    };
    Type: "string" | "number" | "date";
    formFieldValue_Base: {
        name: string;
        value: string | number | string[];
    };
    CustomerFormFieldValue: {
        name: string;
        value: string | number | string[];
    } & {
        customer_id: number;
    };
    formFieldValue_Full: {
        name: string;
        value: string | number | string[];
        customer_id: number;
    } | {
        name: string;
        value: string | number | string[];
        address_id: number;
    };
    formFieldValue_Put: (({
        name: string;
        value: string | number | string[];
    } & {
        customer_id: number;
    }) | ({
        name: string;
        value: string | number | string[];
    } & {
        address_id: number;
    }))[];
    consent_Full: {
        allow?: definitions["consentAllow"][];
        deny?: definitions["Deny"][];
        updated_at?: string;
    };
    DeclareCustomerConsentResponse: {
        customer_id?: {
            [key: string]: any;
        };
        allow?: definitions["consentAllow"][];
        deny?: definitions["Deny"][];
        updated_at?: string;
    };
    consentAllow: "essential" | "functional" | "analytics" | "targeting";
    Deny: "essential" | "functional" | "analytics" | "targeting";
    DeclareCustomerConsentRequest: {
        allow?: definitions["consentAllow"][];
        deny?: definitions["Deny"][];
    };
    customer_Base: {
        email?: string;
        first_name?: string;
        last_name?: string;
        company?: string;
        phone?: string;
        notes?: string;
        tax_exempt_category?: string;
        customer_group_id?: number;
    };
    customerAttributes_Full: {
        attribute_id: number;
        value: string;
        id?: number;
        customer_id: number;
        date_modified?: string;
        date_created?: string;
    }[];
    customerAttributes_Base: {
        attribute_id: number;
        value: string;
    }[];
    attribute_Base: {
        name: string;
        type: "string" | "number" | "date";
        id: number;
        date_modified?: string;
        date_created?: string;
    };
    customerChannelIds: number[];
}
export interface parameters {
    FilterNameParam: string[];
    FilterEmailParam: string;
    FilterNameLikeParam: string[];
    FilterAttributeNameLikeParam: string;
    FilterIdParam: number[];
    FilterDateModifiedParam: string;
    FilterDateModifiedMinParam: string;
    FilterDateModifiedMaxParam: string;
    FilterDateCreatedParam: string;
    FilterDateCreatedMinParam: string;
    FilterDateCreatedMaxParam: string;
    FilterCustomerRegistrationIPAddressParam: number[];
    FilterCompanyParam: string[];
    FilterCustomerGroupParam: string[];
    FilterCustomerAttributeTypeParam: "string" | "number" | "date";
    FilterAttributeValueByNameParam: string;
    FilterPageParam: number;
    FilterLimitParam: number;
    FilterCustomerIncludeParam: "addresses" | "storecredit" | "attributes" | "formfields";
    FilterAddressIncludeParam: "formfields";
    Accept: string;
    "Content-Type": string;
    FilterCustomerIdParam: number[];
    FilterAttributeIdParam: number[];
    FilterCustomerIdEqualsParam: number;
    FilterAddressIdEqualsParam: number;
    FilterFormFieldNameParam: string;
    FilterFormFieldTypeParam: "checkboxes" | "date" | "multiline" | "numbers" | "password" | "radiobuttons" | "text" | "picklist";
}
export interface responses {
    CustomerCollectionResponse: {
        schema: {
            data?: definitions["customer_Full"][];
            meta?: definitions["_metaCollection"];
        };
    };
    CustomerResponse: {
        schema: {
            data?: definitions["customer_Full"][];
            meta?: {
                [key: string]: any;
            };
        };
    };
    AddressCollectionResponse: {
        schema: {
            data?: {
                first_name: string;
                last_name: string;
                company?: string;
                address1: string;
                address2?: string;
                city: string;
                state_or_province: string;
                postal_code: string;
                country_code: string;
                phone?: string;
                address_type?: "residential" | "commercial";
                customer_id: number;
                id: number;
                country?: string;
                form_fields?: (({
                    name: string;
                    value: string | number | string[];
                } & {
                    customer_id: number;
                }) | ({
                    name: string;
                    value: string | number | string[];
                } & {
                    address_id: number;
                }))[];
            }[];
            meta?: {
                pagination?: {
                    total?: number;
                    count?: number;
                    per_page?: number;
                    current_page?: number;
                    total_pages?: number;
                    links?: {
                        previous?: string;
                        current?: string;
                        next?: string;
                    };
                };
            };
        };
    };
    AddressResponse: {
        schema: {
            data?: {
                first_name: string;
                last_name: string;
                company?: string;
                address1: string;
                address2?: string;
                city: string;
                state_or_province: string;
                postal_code: string;
                country_code: string;
                phone?: string;
                address_type?: "residential" | "commercial";
                customer_id: number;
                id: number;
                country?: string;
                form_fields?: (({
                    name: string;
                    value: string | number | string[];
                } & {
                    customer_id: number;
                }) | ({
                    name: string;
                    value: string | number | string[];
                } & {
                    address_id: number;
                }))[];
            }[];
            meta?: {
                [key: string]: any;
            };
        };
    };
    CustomerAttributeValueCollectionResponse: {
        schema: {
            data?: {
                attribute_id: number;
                value: string;
                id?: number;
                customer_id: number;
                date_modified?: string;
                date_created?: string;
            }[];
            meta?: {
                pagination?: {
                    total?: number;
                    count?: number;
                    per_page?: number;
                    current_page?: number;
                    total_pages?: number;
                    links?: {
                        previous?: string;
                        current?: string;
                        next?: string;
                    };
                };
            };
        };
    };
    CustomerAttributeValueResponse: {
        schema: {
            data?: {
                attribute_id: number;
                value: string;
                id?: number;
                customer_id: number;
                date_modified?: string;
                date_created?: string;
            }[];
            meta?: {
                [key: string]: any;
            };
        };
    };
    CustomerAttributeCollectionResponse: {
        schema: {
            data?: {
                attribute_id: number;
                value: string;
                id?: number;
                customer_id: number;
                date_modified?: string;
                date_created?: string;
            }[];
            meta?: {
                pagination?: {
                    total?: number;
                    count?: number;
                    per_page?: number;
                    current_page?: number;
                    total_pages?: number;
                    links?: {
                        previous?: string;
                        current?: string;
                        next?: string;
                    };
                };
            };
        };
    };
    CustomerAttributesResponse: {
        schema: {
            data?: {
                name: string;
                type: "string" | "number" | "date";
                id: number;
                date_modified?: string;
                date_created?: string;
            }[];
            meta?: {
                [key: string]: any;
            };
        };
    };
    FormFieldValueCollectionResponse: {
        schema: {
            data?: (({
                name: string;
                value: string | number | string[];
            } & {
                customer_id: number;
            }) | ({
                name: string;
                value: string | number | string[];
            } & {
                address_id: number;
            }))[];
            meta?: {
                pagination?: {
                    total?: number;
                    count?: number;
                    per_page?: number;
                    current_page?: number;
                    total_pages?: number;
                    links?: {
                        previous?: string;
                        current?: string;
                        next?: string;
                    };
                };
            };
        };
    };
    FormFieldValuesResponse: {
        schema: {
            data?: (({
                name: string;
                value: string | number | string[];
            } & {
                customer_id: number;
            }) | ({
                name: string;
                value: string | number | string[];
            } & {
                address_id: number;
            }))[];
            meta?: {
                [key: string]: any;
            };
        };
    };
    consent_Resp: {
        schema: definitions["consent_Full"];
    };
}
export interface operations {
    CustomersGet: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                "id:in"?: unknown;
                "company:in"?: unknown;
                "customer_group_id:in"?: unknown;
                date_created?: unknown;
                "date_created:max"?: unknown;
                "date_created:min"?: unknown;
                date_modified?: unknown;
                "date_modified:min"?: unknown;
                "date_modified:max"?: unknown;
                "email:in"?: unknown;
                "name:in"?: unknown;
                "name:like"?: unknown;
                "registration_ip_address:in"?: unknown;
                include?: unknown;
                sort?: unknown;
            };
        };
        responses: {
            200: responses["CustomerCollectionResponse"];
        };
    };
    CustomersPut: {
        parameters: {
            body: {
                body: {
                    email?: string;
                    first_name?: string;
                    last_name?: string;
                    company?: string;
                    phone?: string;
                    registration_ip_address?: string;
                    notes?: string;
                    tax_exempt_category?: string;
                    customer_group_id?: number;
                    id: number;
                    authentication?: {
                        force_password_reset?: boolean;
                        new_password?: string;
                    };
                    accepts_product_review_abandoned_cart_emails?: boolean;
                    store_credit_amounts?: {
                        amount?: number;
                    }[];
                }[];
            };
        };
        responses: {
            200: responses["CustomerCollectionResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersPost: {
        parameters: {
            body: {
                body: {
                    email: string;
                    first_name: string;
                    last_name: string;
                    company?: string;
                    phone?: string;
                    notes?: string;
                    tax_exempt_category?: string;
                    customer_group_id?: number;
                    addresses?: {
                        first_name: string;
                        last_name: string;
                        company?: string;
                        address1: string;
                        address2?: string;
                        city: string;
                        state_or_province: string;
                        postal_code: string;
                        country_code: string;
                        phone?: string;
                        address_type?: "residential" | "commercial";
                    }[];
                    attributes?: {
                        attribute_id: number;
                        attribute_value: string;
                    }[];
                    authentication?: {
                        force_password_reset?: boolean;
                        new_password?: string;
                    };
                    accepts_product_review_abandoned_cart_emails?: boolean;
                    store_credit_amounts?: {
                        amount?: number;
                    }[];
                }[];
            };
        };
        responses: {
            200: responses["CustomerCollectionResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersDelete: {
        parameters: {
            query: {
                "id:in": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    CustomersAddressesGet: {
        parameters: {
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
            query: {
                page?: unknown;
                limit?: unknown;
                "company:in"?: unknown;
                name?: unknown;
                "customer_id:in"?: unknown;
                include?: unknown;
                "id:in"?: unknown;
            };
        };
        responses: {
            200: responses["AddressCollectionResponse"];
        };
    };
    CustomersAddressesPut: {
        parameters: {
            body: {
                body: {
                    first_name: string;
                    last_name: string;
                    company?: string;
                    address1: string;
                    address2?: string;
                    city: string;
                    state_or_province: string;
                    postal_code: string;
                    country_code: string;
                    phone?: string;
                    address_type?: "residential" | "commercial";
                    customer_id: number;
                    id: number;
                }[];
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            200: responses["AddressCollectionResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersAddressesPost: {
        parameters: {
            body: {
                body: {
                    first_name: string;
                    last_name: string;
                    company?: string;
                    address1: string;
                    address2?: string;
                    city: string;
                    state_or_province: string;
                    postal_code: string;
                    country_code: string;
                    phone?: string;
                    address_type?: "residential" | "commercial";
                    customer_id: number;
                }[];
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            200: responses["AddressCollectionResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersAddressesDelete: {
        parameters: {
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
            query: {
                "id:in": unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    CustomersAttributesGet: {
        parameters: {
            query: {
                page?: unknown;
                limit?: unknown;
                "name:in"?: unknown;
                "name:like"?: unknown;
                type?: unknown;
                date_created?: unknown;
                "date_created:max"?: unknown;
                "date_created:min"?: unknown;
                date_modified?: unknown;
                "date_modified:max"?: unknown;
                "date_modified:min"?: unknown;
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            200: responses["CustomerAttributesResponse"];
        };
    };
    CustomersAttributesPut: {
        parameters: {
            body: {
                body: definitions["attribute_Put"][];
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            200: responses["CustomerAttributesResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersAttributesPost: {
        parameters: {
            body: {
                body: {
                    name: string;
                    type: "string" | "number" | "date";
                }[];
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            200: responses["CustomerAttributesResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersAttributesDelete: {
        parameters: {
            query: {
                "id:in": unknown;
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    CustomersAttributeValuesGet: {
        parameters: {
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
            query: {
                page?: unknown;
                limit?: unknown;
                "customer_id:in"?: unknown;
                "attribute_id:in"?: unknown;
                name?: unknown;
                date_created?: unknown;
                "date_created:max"?: unknown;
                "date_created:min"?: unknown;
                date_modified?: unknown;
                "date_modified:max"?: unknown;
                "date_modified:min"?: unknown;
            };
        };
        responses: {
            200: responses["CustomerAttributeValueCollectionResponse"];
        };
    };
    CustomersAttributeValuesPut: {
        parameters: {
            body: {
                body: {
                    attribute_id: number;
                    value: string;
                    id?: number;
                    customer_id: number;
                }[];
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            200: responses["CustomerAttributeValueCollectionResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersAttributeValuesDelete: {
        parameters: {
            query: {
                "id:in": unknown;
            };
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
        };
        responses: {
            204: never;
        };
    };
    CustomerFormFieldsGet: {
        parameters: {
            header: {
                Accept?: unknown;
                "Content-Type"?: unknown;
            };
            query: {
                page?: unknown;
                limit?: unknown;
                customer_id?: unknown;
                address_id?: unknown;
                field_name?: unknown;
                field_type?: unknown;
            };
        };
        responses: {
            200: responses["FormFieldValueCollectionResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomerFormFieldValuePUT: {
        parameters: {
            body: {
                body?: (({
                    name: string;
                    value: string | number | string[];
                } & {
                    customer_id: number;
                }) | ({
                    name: string;
                    value: string | number | string[];
                } & {
                    address_id: number;
                }))[];
            };
        };
        responses: {
            200: responses["FormFieldValueCollectionResponse"];
            422: {
                schema: {
                    status?: number;
                    title?: string;
                    type?: string;
                    instance?: string;
                    errors?: {
                        [key: string]: string;
                    };
                };
            };
        };
    };
    CustomersConsentByCustomerId_GET: {
        parameters: {
            path: {
                customerId: unknown;
            };
        };
        responses: {
            200: responses["consent_Resp"];
            401: {
                schema: definitions["ErrorResponse"];
            };
            403: {
                schema: definitions["ErrorResponse"];
            };
            422: {
                schema: definitions["ErrorResponse"];
            };
        };
    };
    CustomersConsentByCustomerId_PUT: {
        parameters: {
            header: {
                "Content-Type"?: unknown;
            };
            body: {
                body?: definitions["DeclareCustomerConsentRequest"];
            };
            path: {
                customerId: unknown;
            };
        };
        responses: {
            200: responses["consent_Resp"];
            401: {
                schema: definitions["ErrorResponse"];
            };
            403: {
                schema: definitions["ErrorResponse"];
            };
            422: {
                schema: definitions["ErrorResponse"];
            };
        };
    };
}
