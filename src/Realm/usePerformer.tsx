import { useState, useEffect } from 'react';
import { getRealmInstance } from './realmInstance';
import { Performer } from '@RealmTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Realm from 'realm';
import { cos } from 'react-native-reanimated';

export const usePerformers = () => {
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const realm = await getRealmInstance();
      const performersResult = realm.objects('Performer');
      setPerformers(performersResult);

      // Listen for changes in the Performer objects
      const handleChange = (newPerformers: Performer[], changes: any) => {
        setPerformers([...newPerformers]);
      };
      performersResult.addListener(handleChange);

      await fetchAndUpdatePerformers();

      setIsLoading(false);

      return () => {
        // Clean up the listener when the component unmounts
        performersResult.removeListener(handleChange);
        realm.close();
      };
    };

    fetchData();
  }, []);

  return { performers, isLoading };
};

async function fetchPerformersData() {
  const performersRef = firestore().collection('Performers');
  const performersSnapshot = await performersRef.get();
  const performersData = performersSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      firstName: data.firstName ?? null,
      surname: data.surname ?? null,
      name: data.name ?? null,
      grade: data.grade ?? null,
      height: data.height ?? null,
      chest: data.chest ?? null,
      collarSize: data.collarSize ?? null,
      waistSize: data.waistSize ?? null,
      insideLeg: data.insideLeg ?? null,
      shoeSize: data.shoeSize ?? null,
      email: data.email ?? null,
      eyeColor: data.eyeColor ?? null,
      skills: data.skills ?? null,
      sex: data.sex ?? null,
      credits: data.credits ? data.credits.map(credit => ({
        project: credit.project ?? null,
        role: credit.role ?? null,
        year: credit.year ?? null,
      })) : [],
    };
  });
  return performersData;
}


const LAST_FETCH_KEY = 'last_fetch_version';

async function updateLocalVersion(remoteVersion: number): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_FETCH_KEY, remoteVersion.toString());
  } catch (error) {
    console.error('Error updating local version:', error);
  }
}

const isTimeToFetch = async () => {
  try {
    // Fetch version number from Firestore
    const versionSnapshot = await firestore()
      .collection('AppVersion')
      .doc('Data')
      .get();
    const versionData = versionSnapshot.data();
    const remoteVersion = versionData ? versionData.DB_ver : 0;

    // Get local version number
    const localVersion = await AsyncStorage.getItem(LAST_FETCH_KEY);

    // Compare local and remote versions
    if (localVersion && localVersion >= remoteVersion) {
      return false;
    }
    await updateLocalVersion(remoteVersion);
  } catch (error) {
    console.error('Error checking fetch time:', error);
  }

  return true;
};

export const fetchAndUpdatePerformers = async () => {
  try {
    const shouldFetch = await isTimeToFetch();

    if (shouldFetch) {
      const performersData = await fetchPerformersData();
      const realm = await getRealmInstance();
      realm.write(() => {
        performersData.forEach((performerData) => {
          const performer = {
            ...performerData
          };
          realm.create('Performer', performer, Realm.UpdateMode.Modified);
        });
      });
    }
  } catch (error) {
    console.error('Error fetching and updating performers:', error);
  }
};
