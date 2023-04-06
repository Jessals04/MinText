import CryptoJS from "crypto-js";

/*
 * Hash function will take in a value and
 * hash it using SHA256. It will then return
 * the hashed string in Base64.
 */

export default function Hash(text) {
    // hashedText is a Word Array
    const hashedText = CryptoJS.SHA256(text);

    // hashedString is a String
    const hashedString = hashedText.toString(CryptoJS.enc.Base64);

    return hashedString;
}