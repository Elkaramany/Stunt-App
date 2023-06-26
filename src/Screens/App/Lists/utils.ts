import { Performer } from '@RealmTypes';
import { isPresentInMyIds } from '@Config';

export const addPerformer = (newId: string, ids: string[], setIds: (val: string[]) => void) => {
    let arr = [...ids]
    const index = arr.indexOf(newId); // Find index of the string in the array
    if (index === -1) {
        // If the string is not already in the array, add it
        arr.push(newId);
    } else {
        // If the string is already in the array, remove it
        arr.splice(index, 1);
    }

    setIds(arr)
}

export const getPerformanceArray = (ids: string[], allPerformers: Performer[]): Performer[] => {
    const selectedPerformers: Performer[] = [];

    for (let i = 0; i < allPerformers.length; i++) {
        if (isPresentInMyIds(allPerformers[i].id, ids)) {
            selectedPerformers.push(allPerformers[i]);
        }
    }

    return selectedPerformers;
}


export const handleDelete = (id: string, allIds: string[]): string[] => {
    const index = allIds.indexOf(id);
    if (index !== -1) {
        // Use the spread operator to create a new array without the deleted item
        return [...allIds.slice(0, index), ...allIds.slice(index + 1)];
    }
    // If the item is not found, return the original array
    return allIds;
};

export const isSelected = (id: string, ids: string[]): boolean => {
    for (let i = 0; i < ids.length; i++) {
        if (id == ids[i]) return true
    }

    return false
}