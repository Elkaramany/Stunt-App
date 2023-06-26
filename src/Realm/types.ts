export interface Payload {
    prop: string
    value: number | string | object | boolean | undefined
}

export interface Performer {
    id: string
    firstName: string;
    surname: string;
    name: string;
    grade: number;
    height: number;
    chest: number;
    collarSize: number;
    waistSize: number;
    insideLeg: number;
    shoeSize: number;
    email: string;
    eyeColor: string;
    skills: string[];
    sex: string;
    credits?: {
        project: string;
        role: string;
        year: string;
    }[]
}

export const INITIAIL_FILTERS: PerformerFilter = {
    height: { min: 100, max: 230 }, // 3'3" (100 cm) to 7'6" (230 cm)
    chest: { min: 25, max: 60 }, // 23.6" (60 cm) to 59" (150 cm)
    waistSize: { min: 15, max: 50 }, // 17.7" (45 cm) to 59" (150 cm)
    insideLeg: { min: 25, max: 50 }, // 19.7" (50 cm) to 47.2" (120 cm)
    shoeSize: { min: 3, max: 18 }, // Adjusted to cover a wider range of shoe sizes
    sex: ["Male", "Female"]
}

export type PerformerFilter = {
    height: { min: number, max: number },
    chest: { min: number, max: number },
    waistSize: { min: number, max: number },
    insideLeg: { min: number, max: number },
    shoeSize: { min: number, max: number },
    sex: string[]
}

export interface UserInfo {
    uid: string;
    displayName?: string;
    familyName?: string;
    email?: string;
    emailVerified?: boolean;
    phoneNumber?: string;
}

export interface PerformanceListType {
    title: string
    id: string
    performersId: string[]
    shouldDelete: boolean
}