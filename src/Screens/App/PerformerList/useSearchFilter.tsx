import { useState, useEffect } from 'react';
import { INITIAIL_FILTERS, Performer, PerformerFilter } from '@RealmTypes';
import { usePerformers } from '@Realm';
import { filterPerformers, searchByName } from './utils';

interface UseIndexProps {
    filters: PerformerFilter;
    inputArr?: Performer[]
}

export const useIndex = ({ filters, inputArr }: UseIndexProps) => {
    let { performers, isLoading } = usePerformers();
    performers = inputArr ? inputArr : performers
    const [search, setSearch] = useState('');
    const [filteredPerformers, setFilteredPerformers] = useState<Performer[]>([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        const debounceSearch = setTimeout(() => {
            searchAndFilterPerformers();

            setLoader(false);
        }, 300);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [search, filters, performers]);

    const searchAndFilterPerformers = async () => {

        let performersToFilter = performers;

        if (search.length > 0) {
            performersToFilter = await searchByName(performers, search);
        }

        if (filters === INITIAIL_FILTERS) {
            setFilteredPerformers(performersToFilter)
        } else {
            const filteredPerformers = await filterPerformers(performersToFilter, filters);
            setFilteredPerformers(filteredPerformers);
        }
    };

    return {
        performers: filteredPerformers,
        isLoading: isLoading || loader,
        search,
        setSearch
    };
};
