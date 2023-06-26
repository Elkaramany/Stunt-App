import { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import { PerformanceListNavigationProp } from '@NavigationTypes';
import { Performer } from '@RealmTypes';
import { usePerformerList, usePerformers } from '@Realm';
import { getPerformanceArray, handleDelete } from './utils';

interface UsePerformanceListLogicProps {
    navigation: PerformanceListNavigationProp;
    item: {
        id: string;
        title: string;
    };
}

export const usePerformanceListLogic = ({ navigation, item }: UsePerformanceListLogicProps) => {
    const [ids, setIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPerformer, setSelectedPerformers] = useState<Performer[]>([]);
    const { performers, isLoading } = usePerformers();
    const { updatePerformerList, getPerformerListById, deletePerformerList, isLoading: isListLoading } = usePerformerList();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    const fetchData = async () => {
        const myList = await getPerformerListById(item.id);
        setIds(myList.performersId);
    };

    useEffect(() => {
        if (!isLoading && performers.length > 0) {
            let arr = getPerformanceArray(ids, performers);
            setSelectedPerformers(arr);
            setLoading(false);
        }
    }, [isLoading, ids]);

    const deleteOnePerformer = async (id: string) => {
        setLoading(true);
        try {
            let newIdsArr = handleDelete(id, ids);
            await updatePerformerList(item.id, item.title, newIdsArr);
            setIds(newIdsArr);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const deleteAllPerformers = async () => {
        deletePerformerList(item.id)
        navigation.goBack();
    };

    const handleDeleteAll = () => {
        Alert.alert('Delete List', 'Are you sure you want to delete this List?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => deleteAllPerformers() },
        ]);
    }

    return {
        isLoading: isLoading || loading || isListLoading,
        selectedPerformer,
        deleteOnePerformer,
        handleDeleteAll,
    };
};
