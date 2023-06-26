import { ShowToast, validateEmail, validatePassword } from "@Config"
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UserInfo } from "@RealmTypes";

export const SignEmailPassword = (email: string, password: string, signIn: boolean) => {
    if (!validateEmail(email)) {
        ShowToast('error', 'Invalid Email', 'Please type in a correct email')
        return;
    }

    if (!validatePassword(password)) {
        ShowToast('error', 'Invalid Password, Must be 6 characters long', 'At least 1 uppercase, 1 lowercase letters and 1 number')
        return;
    }
    if (signIn) return signInWithEmail(email, password)
    else return signUpWithEmail(email, password)
}

type SignError = {
    code: string;
    message: string;
};

type SignResult = {
    success: boolean;
    user?: UserInfo
    error?: SignError;
};

export const signUpWithEmail = async (
    email: string,
    password: string,
): Promise<SignResult> => {
    try {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        await user.sendEmailVerification();
        if (user.displayName) {
            ShowToast('success', 'Welcome', user.displayName)
        } else ShowToast('success', 'Signed up')
        return { success: true, user: extractUserInfo(user) };
    } catch (error: any) {
        return catchError(error, 'Sign up Error')
    }
};

export const signInWithEmail = async (
    email: string,
    password: string,
): Promise<SignResult> => {
    try {
        const { user } = await auth().signInWithEmailAndPassword(email, password);
        if (user.displayName) {
            ShowToast('success', 'Welcome back', user.displayName)
        } else ShowToast('success', 'Logged In')
        return { success: true, user: extractUserInfo(user) };
    } catch (error: any) {
        return catchError(error, 'LoginError')
    }
};

function extractUserInfo(user: FirebaseAuthTypes.User): UserInfo {
    const { displayName, email, emailVerified, phoneNumber, providerData, uid } = user;
    const name = displayName ? displayName.split(' ')[0] : '';
    const familyName = displayName ? displayName.split(' ')[1] : '';
    //@ts-ignore
    return { name, displayName, familyName, email, emailVerified, phoneNumber, uid };
}

const catchError = (error: SignError, message: string) => {
    const errorMessage: string = error.message;
    const errorCode: string = error.code;

    const SignError: SignError = {
        code: errorCode,
        message: errorMessage,
    };

    ShowToast('error', message, errorMessage)

    return { success: false, error: SignError };
}