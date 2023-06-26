import DeviceInfo from 'react-native-device-info';

import Toast from 'react-native-toast-message';

export const validateName = (name: string): boolean => {
    if (!name || name.length < 2) return false;
    return true;
}

export const validateEmail = (email: string | undefined): boolean => {
    if (!email) return false
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

type MembershipTitle = 'Senior Stunt Performer' | 'Probationary' | 'Full Member' | 'Stunt Performer' | '';
type MembershipColor = 'baige' | 'lime' | 'brightRed' | 'orange' | 'primary';

export const getMembershipStatus = (num: number): { title: MembershipTitle, color: MembershipColor } => {
    switch (num) {
        case 0:
            return { title: 'Senior Stunt Performer', color: 'baige' };
        case 1:
            return { title: 'Probationary', color: 'lime' };
        case 2:
            return { title: 'Full Member', color: 'brightRed' };
        case 3:
            return { title: 'Stunt Performer', color: 'orange' };
        default:
            return { title: '', color: 'primary' }
    }
}

export const isPresentInMyIds = (id: string, ids: string[]) => {
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] === id) return true
    }

    return false
}

export const convertCmToFeetAndInches = (heightCm: number): string => {
    const inches = heightCm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches - feet * 12);

    const formattedInches = remainingInches === Math.floor(remainingInches) ? remainingInches.toString() : remainingInches.toFixed(1);

    return `${feet}' ${formattedInches || '0"'}'`;
};

export const convertCmToInches = (heightCm: number): string => {
    const inches = heightCm / 2.54;
    const formattedInches = inches === Math.floor(inches) ? inches.toString() : inches.toFixed(1);

    return `${formattedInches || '0"'}"`;
};

export const validatePassword = (password: string | undefined): boolean => {
    if (!password) return false
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    // Check if the password meets all requirements
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const isLongEnough = password.length >= 6;

    return hasUppercase && hasLowercase && hasDigit && isLongEnough;
}

export const validatePhone = (phone: string) => {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (regex.test(phone)) return true
    return false
}

export const formatDate = (date: Date | string) => {
    return date.toString().substring(0, date.toString().length - 18)
}

export const ShowToast = (type: string, text1: string, text2?: string) => {
    if (text2?.length) {
        Toast.show({
            type,
            text1,
            text2,
        });
    } else {
        Toast.show({
            type,
            text1,
        });
    }
}

export const hasNotch = () => {
    const deviceModel = DeviceInfo.getModel();
    // Add all iPhone models with a notch to this array
    const notchModels = ['iPhone 14 Pro', 'iPhone 14 Pro Max'];
    return notchModels.includes(deviceModel);
};