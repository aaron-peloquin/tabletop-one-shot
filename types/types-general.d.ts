declare module 'TS_General' {
    import { zodSchemaOverview } from '@static';

    type T_CardLayer = '1' | '2' | '3' | '4' | '5'

    type Schema = z.infer<typeof zodSchemaOverview>;
}
