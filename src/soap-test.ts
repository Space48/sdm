import { createClientAsync } from "soap";

async function main(instance: Instance) {
    const client = await createClientAsync(`${instance.baseUrl}/api/v2_soap?wsdl=1`, {
        attributesKey: '123'
    });
    console.log(JSON.stringify(await client.describe()));
}

main({
    baseUrl: 'https://www.irregularchoice.com',
    credentials: {
        apiUser: 'space48-data-migration',
        apiKey: '123',
    },
    insecure: true,
});

interface Instance {
    baseUrl: string
    credentials?: Credentials
    insecure?: boolean
}

interface Credentials {
    apiUser: string
    apiKey: string
}
