import { Code as FhcCode } from '@icure/be-fhc-api';

export const Code = {
    from: (type: string, code: string, version?: string) => new FhcCode({
        id: `${type}:${code}:${version ?? '1.0'}`,
        type,
        code,
        version: version ?? '1.0',
    }),
}
