import { PerformerFilter, Performer } from "@RealmTypes";

export const filterPerformers = (performers: Performer[], filter: PerformerFilter) => {
    const filteredPerformers = performers.filter((performer) => {
        const { height, chest, waistSize, insideLeg, shoeSize, sex } = performer;
        if (
            height >= filter.height.min &&
            height <= filter.height.max &&
            chest >= filter.chest.min &&
            chest <= filter.chest.max &&
            waistSize >= filter.waistSize.min &&
            waistSize <= filter.waistSize.max &&
            insideLeg >= filter.insideLeg.min &&
            insideLeg <= filter.insideLeg.max &&
            shoeSize >= filter.shoeSize.min &&
            shoeSize <= filter.shoeSize.max &&
            filter.sex.includes(sex)
        ) {
            return true;
        }
        return false;
    });

    return filteredPerformers
}

export const searchByName = (performers: Performer[], name: string) => {
    const filteredPerformers = performers.filter((performer) => {
        return performer.name.toLowerCase().includes(name.toLowerCase());
    });

    return filteredPerformers;
}
