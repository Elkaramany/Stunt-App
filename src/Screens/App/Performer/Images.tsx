import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Performer } from '@RealmTypes';
import { GlobalStyles, WIDTH } from '@Config';
import { scale } from 'react-native-size-matters';
import { GenericUser } from '@Assets';

const Skills: React.FC<{ item: Performer }> = ({ item }) => {
    const IMAGE_WIDTH = WIDTH / 4;

    const renderSkillImage = (image: any, index: number) => (
        <Image
            key={`skill-${index}`}
            source={GenericUser}
            style={{
                width: IMAGE_WIDTH,
                height: IMAGE_WIDTH,
                resizeMode: 'contain',
                margin: scale(5),
                borderRadius: scale(10),
            }}
        />
    );

    const skills = [1, 2, 3, 4];

    return (
        <View style={GlobalStyles.rowWrap}>
            {skills.map((skill, index) => renderSkillImage(skill, index))}
        </View>
    );
};

export default Skills;
