import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { Performer } from '@RealmTypes';
import { Text } from '@Components';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors, GlobalStyles, WIDTH, getMembershipStatus, convertCmToFeetAndInches, convertCmToInches } from '@Config';
import { GenericUser, GrayLogo, LogoTransparent } from '@Assets';

interface PerfromerSkill {
  key: string
  label: string
  value: string | number
}

const MyWebView = ({ item }: { item: Performer }) => {
  const data: PerfromerSkill[] = [
    { key: 'height', label: 'Height', value: convertCmToFeetAndInches(item.height) },
    { key: 'insideArm', label: 'Inside Arm', value: '-' },
    { key: 'shoeSize', label: 'Shoe', value: item.shoeSize },
    { key: 'chest', label: 'Chest', value: convertCmToInches(item.chest) },
    { key: 'insideLeg', label: 'Inside Leg', value: convertCmToInches(item.insideLeg) },
    { key: 'weight', label: 'Weight', value: '-' },
    { key: 'waistSize', label: 'Waist', value: convertCmToInches(item.waistSize) },
    { key: 'collarSize', label: 'Collar', value: convertCmToInches(item.collarSize) },
    { key: 'eyeColor', label: 'Eyes', value: item.eyeColor },
    { key: 'hips', label: 'Hips', value: '-' },
    { key: 'hat', label: 'Hat', value: '-' },
    { key: 'hair', label: 'Hair', value: '-' },
  ];
  const selectedMembership = React.useMemo(() => getMembershipStatus(item.grade), [item.grade]);

  const renderSkill = ({ item }: { item: PerfromerSkill }) => {
    return (
      <View style={{ flexDirection: 'row', width: WIDTH / 4.5, marginVertical: verticalScale(2) }}>
        <Text str={`${item.label}: `} style={[{ fontWeight: 'bold' }, styles.normalText]} />
        <Text str={item.value.toString()} style={styles.normalText} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        <View style={[GlobalStyles.rowBetween, GlobalStyles.bottomBorder, styles.header]}>
          <View style={[{ backgroundColor: Colors[selectedMembership.color] }, styles.logoContainer]}>
            <LogoTransparent />
            <Text str={selectedMembership.title} style={[styles.pdfText, styles.memberbeShipText]} />
          </View>
          <Text str={item.name.toUpperCase()} style={{ color: Colors.placeholder, fontWeight: 'bold' }} />
          <View style={{ width: WIDTH / 8 }} />
        </View>

        <View style={[GlobalStyles.centeredContainer, { marginTop: verticalScale(5) }]}>
          <View style={{ flexDirection: 'row' }}>
            <Text str={`Mobile:`} style={[{ color: Colors.placeholder }, styles.normalText]} />
            <Text str={`+56215122`} style={styles.normalText} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text str={`Email:`} style={[{ color: Colors.placeholder }, styles.normalText]} />
            <Text str={item.email} style={styles.normalText} />
          </View>
        </View>

        <View style={[GlobalStyles.rowBetween, styles.measurementsAndImage]}>
          <View style={{ flex: 3 }}>
            <Text str={`MEASUREMENTS:`} style={[{ color: Colors.placeholder, marginBottom: scale(6) }, styles.normalText]} />
            <FlatList
              data={data}
              keyExtractor={item => `${item.key}`}
              renderItem={renderSkill}
              numColumns={3}
            />
          </View>
          <Image
            source={GenericUser}
            style={styles.roundImage}
            resizeMode='contain'
          />
        </View>
      </View>

      <View style={{ flex: 7, flexDirection: 'row' }}>
        <View style={{ flex: 3 }}>
          
          {item.credits && item.credits?.length > 0 && (
            <>
              <Text str="CREDITS INCLUDE:" style={[styles.subTitleText, styles.normalText]} />
              {item.credits.map((cred: any, index: number) => (
                <Text
                  key={index}
                  str={`${cred.project}@${cred.year}`}
                  style={[styles.normalText, { fontWeight: 'bold' }]}
                />
              ))}
            </>
          )}

          {true && (
            <View style={{ marginVertical: verticalScale(20) }}>
              <Text str="DOUBLED FOR:" style={[styles.subTitleText, styles.normalText]} />

              {['First', 'Second', 'Third', 'Fourth'].map((cred: any, index: number) => (
                <Text
                  key={index}
                  str={`${cred} Project`}
                  style={[styles.normalText, { marginVertical: scale(1.5) }]}
                />
              ))}
            </View>
          )}


          {item.skills && item.skills?.length > 0 && (
            <View style={{ marginRight: scale(20), }}>
              <Text str="SKILLS:" style={[styles.subTitleText, styles.normalText]} />
              <Text
                str={item.skills.join(' - ')}
                style={[styles.normalText, { fontWeight: '500' }]}
              />
            </View>
          )}
        </View>

        <Image
          source={GenericUser}
          style={styles.coverImage}
          resizeMode='cover'
        />
      </View>

      <View style={{flex: 0.5}}>
        <View style={styles.separator} />
        <View style={{ alignItems: 'center' }}><GrayLogo /></View>
        <Text str='Created with The British Stunt Registry App' style={[{ color: Colors.placeholder, textAlign: 'center' }, styles.normalText]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(10),
  },
  header: {
    paddingBottom: scale(5),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(3),
    paddingVertical: scale(5),
    borderRadius: scale(5),
  },
  pdfText: {
    fontSize: scale(WIDTH * 0.018),
  },
  memberbeShipText: {
    color: Colors.primary,
    marginLeft: scale(5),
  },
  normalText: {
    fontSize: scale(WIDTH * 0.02),
  },
  measurementsAndImage: {
    marginVertical: verticalScale(10),
  },
  roundImage: {
    width: WIDTH / 3.5,
    height: WIDTH / 3.5,
    borderRadius: scale(10),
  },
  coverImage: {
    width: WIDTH / 2.5,
    height: WIDTH / 1,
    borderRadius: scale(10),
    alignSelf: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.placeholder,
    top: scale(15),
  }, subTitleText: {
    color: Colors.placeholder,
    marginBottom: verticalScale(4)
  }
});

export default MyWebView;
