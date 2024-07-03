import * as bcrypt from 'bcrypt';

const saltOrRounds = 5;

type KeyValuePairs = { [key: string]: string | number };

export const formatPlainText = (keyValuePairs: KeyValuePairs): string => {
    const formattedPairs = Object.entries(keyValuePairs)
        .map(([key, value]) => `${key}=${value}`)
        .join(',');

    return formattedPairs;
}

export const compareHash = async (plainText: string, hash: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainText, hash);
    } catch (error) {
        console.error('Error comparing hash:', error);
        throw new Error('Hash comparison failed');
    }
}

// Low performance hash generation
export const generateHash = async (plainText: string): Promise<string> => {
    try {
        return await bcrypt.hash(plainText, saltOrRounds);
    } catch (error) {
        console.error('Error generating hash:', error);
        throw new Error('Hash generation failed');
    }
};
