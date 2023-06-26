export const PerformerSchema = {
    name: 'Performer',
    primaryKey: 'id',
    properties: {
        id: { type: 'string', required: true },
        firstName: { type: 'string', optional: true },
        surname: { type: 'string', optional: true },
        name: { type: 'string', optional: true },
        grade: { type: 'int', optional: true },
        height: { type: 'int', optional: true },
        chest: { type: 'int', optional: true },
        collarSize: { type: 'int', optional: true },
        waistSize: { type: 'int', optional: true },
        insideLeg: { type: 'int', optional: true },
        shoeSize: { type: 'int', optional: true },
        email: { type: 'string', optional: true },
        eyeColor: { type: 'string', optional: true },
        skills: { type: 'list', objectType: 'string', optional: true },
        sex: { type: 'string', optional: true },
        credits: { type: 'Credit[]' },
    },
};

export const CreditSchema = {
    name: 'Credit',
    properties: {
        project: { type: 'string', optional: true },
        role: { type: 'string', optional: true },
        year: { type: 'string', optional: true },
    },
};

export const PerformerListSchema = {
    name: 'PerformerList',
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        performersId: 'string[]',
        shouldDelete: { type: 'bool', default: false }
    },
};
