import CryptoJS from "crypto-js";
import { getMessagesKey } from "./Keys";

/*
 * Encrypt is the default function for the app. It is used
 * to encrypt messages. The other exported function is used
 * when a custom key must be used elsewhere in the app.
 */

export default function Encrypt(text) {
    return CryptoJS.AES.encrypt(text, () => getMessagesKey()).toString();
}

export function encryptWithCustomKey(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
}