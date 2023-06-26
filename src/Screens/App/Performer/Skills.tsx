import React from 'react';
import { View } from 'react-native';
import { Text } from '@Components';
import { Performer } from '@RealmTypes';
import { Colors, GlobalStyles } from '@Config';
import { scale, verticalScale } from 'react-native-size-matters';

const Skills: React.FC<{ item: Performer }> = ({ item }) => {
    const renderSkill = (skill: string, index: number) => (
        <View
            key={`skill-${index}`}
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <Text
                str={`${skill.charAt(0).toUpperCase() + skill.slice(1)}`}
                style={{
                    color: Colors.placeholder,
                    marginVertical: verticalScale(5),
                    marginRight: scale(15),
                    textAlign: 'left',
                }}
            />
        </View>
    );

    const leftColumn = item.skills.slice(0, Math.ceil(item.skills.length / 2));
    const rightColumn = item.skills.slice(Math.ceil(item.skills.length / 2));

    return (
        <View style={[GlobalStyles.rowWrap, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 1 }}>{leftColumn.map((skill, index) => renderSkill(skill, index))}</View>
            <View style={{ flex: 1 }}>{rightColumn.map((skill, index) => renderSkill(skill, index))}</View>
        </View>
    );
};

export default Skills;
