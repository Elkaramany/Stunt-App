import { useState, useEffect } from 'react';
import { getRealmInstance } from './realmInstance';
import Realm from 'realm';

export interface PerformerListType {
    id: string;
    title: string;
    performersId: string[];
    shouldDelete: boolean
}

export const usePerformerList = () => {
    const [performerLists, setPerformerLists] = useState<PerformerListType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        fetchPerformersData();
    }, []);

    const fetchPerformersData = async () => {
        setIsLoading(true);
        const realm = await getRealmInstance();
        const performerListResult = realm.objects<PerformerListType>('PerformerList').filtered('shouldDelete == false'); // add filter for shouldDelete

        // Update the state with all instances
        setPerformerLists([...performerListResult]);

        const handleChange = (newPerformerLists: PerformerListType[], changes: Realm.CollectionChangeSet) => {
            setPerformerLists([...newPerformerLists]);
        };
        performerListResult.addListener(handleChange);

        // Delete objects with shouldDelete set to true
        realm.write(() => {
            const performerListToDelete = realm.objects<PerformerListType>('PerformerList').filtered('shouldDelete == true');
            realm.delete(performerListToDelete);
        });

        setTimeout(() => {
            setIsLoading(false);
        }, 500)

        return () => {
            performerListResult.removeListener(handleChange);
            realm.close();
        };
    };

    const addPerformerList = async (title: string, performersId: string[]) => {
        const realm = await getRealmInstance();
        const id = `${new Date().getTime()}`;

        realm.write(() => {
            realm.create('PerformerList', { id, title, performersId, shouldDelete: false });
        });
    };

    const deletePerformerList = async (id: string) => {
        const realm = await getRealmInstance();
        const performerListToUpdate = realm.objectForPrimaryKey('PerformerList', id);

        if (performerListToUpdate) {
            realm.write(() => {
                performerListToUpdate.shouldDelete = true;
                performerListToUpdate.performersId = [];
            });
        }
    };

    const updatePerformerList = async (id: string, title: string, performersId: string[]) => {
        const realm = await getRealmInstance();
        const performerListToUpdate = realm.objectForPrimaryKey('PerformerList', id);

        if (performerListToUpdate) {
            realm.write(() => {
                performerListToUpdate.title = title;
                performerListToUpdate.performersId = performersId;
                performerListToUpdate.shouldDelete = false;
            });
        }
    };

    const getPerformerListById = async (id: string) => {
        const realm = await getRealmInstance();
        const performerList = realm.objectForPrimaryKey<PerformerListType>('PerformerList', id);
        return performerList;
    };

    const togglePerformerInList = async (performerID: string, listID: string) => {
        setIsLoading(true)
        const realm = await getRealmInstance();
        const performerListToUpdate = realm.objectForPrimaryKey<PerformerListType>('PerformerList', listID);

        if (performerListToUpdate) {
            const index = performerListToUpdate.performersId.indexOf(performerID);
            if (index !== -1) {
                // If the performer is already in the list, remove it
                const updatedPerformersId = performerListToUpdate.performersId.filter((id: string) => id !== performerID);
                realm.write(() => {
                    performerListToUpdate.performersId = updatedPerformersId;
                });
            } else {
                // If the performer is not in the list, add it
                const updatedPerformersId = performerListToUpdate.performersId.concat(performerID);
                realm.write(() => {
                    performerListToUpdate.performersId = updatedPerformersId;
                });
            }

            fetchPerformersData()
        }
    };


    return {
        performerLists,
        isLoading,
        addPerformerList,
        deletePerformerList,
        updatePerformerList,
        getPerformerListById,
        fetchPerformersData,
        togglePerformerInList,
    };
};
