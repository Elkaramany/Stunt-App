import Realm from 'realm';
import { PerformerSchema, CreditSchema, PerformerListSchema } from './schema';

const realmConfig = {
    schema: [PerformerSchema, CreditSchema, PerformerListSchema],
    schemaVersion: 1,
};

export const getRealmInstance = async () => {
    return Realm.open(realmConfig);
};
