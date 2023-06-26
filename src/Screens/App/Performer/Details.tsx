import React from 'react'
import { PerformerSkills } from '@Components'
import { Performer } from '@RealmTypes'
import { getMembershipStatus } from '@Config';

const Details: React.FC<{ item: Performer }> = ({ item }) => {
    let extraData = [
        { key: 'sex', label: 'Sex', value: item.sex },
        { key: 'eyeColor', label: 'Eye Color', value: item.eyeColor },
        { key: 'grade', label: 'Grade', value: getMembershipStatus(item.grade).title },
    ];

    return <PerformerSkills item={item} divider={2.9} extraData={extraData} />
}


export default Details;