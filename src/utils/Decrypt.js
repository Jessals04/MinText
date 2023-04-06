import CryptoJS from "crypto-js";
import { getMessagesKey } from "./Keys";

export default function Decrypt(encryptedBase64) {
    const key = getMessagesKey();
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);

    if (decrypted) {
        try {
            const str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str.length > 0) {
                return str;
            } else {
                throw new Error('Error: the decrypted String was no greater than 0 in length.');
            } 
          } catch (err) {
                console.error(err.message);
                return;
          }
    }
}

export function decryptWithCustomKey(encryptedBase64, key) {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);

    if (decrypted) {
        try {
            const str = decrypted.toString(CryptoJS.enc.Utf8);
            if (str.length > 0) {
                return str;
            } else {
                throw new Error('Error: the decrypted String was no greater than 0 in length.');
            } 
          } catch (err) {
                console.error(err.message);
                return;
          }
    }
}