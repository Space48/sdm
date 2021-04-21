import sampleFullProduct from '../magento-samples/products-full-data.json';
import attributes from '../magento-extract/attributes.json';

type MagentoProduct = typeof sampleFullProduct;
type MagentoAttribute = typeof attributes[0];

const attributesById = new Map(attributes.map(attribute => [attribute.attribute_id, attribute]));
const attributesByCode = new Map<string, MagentoAttribute>(attributes.map(attribute => [attribute.attribute_code, attribute]));

export function getAttribute(product: MagentoProduct, attributeCode: string): string | undefined {
    const lookupTypes = ['boolean', 'multiselect', 'select'];
    const attribute = attributesByCode.get(attributeCode) ?? undefined;
    const attributeType = attribute?.frontend_input ?? '';
    const attributeValue = getAttributeValue(product, attributeCode);

    if (attributeValue === null || attributeValue === undefined) {
        return undefined;
    }

    if (lookupTypes.includes(attributeType) && attribute!.options) {
        //perform lookup
        const lookUpValue = (attributeType == 'multiselect') ? attributeValue?.split(',') : attributeValue;
        return attribute!.options?.filter(({value}) => lookUpValue.includes(value)).map(({label}) => label)?.join(', ') ?? 'undefined'
    }
    return attributeValue
}

export function getAttributeValue(product: MagentoProduct, attributeCode: string): string | null{
    const key = attributeCode as keyof MagentoProduct;
    return product[key] as string | null
}