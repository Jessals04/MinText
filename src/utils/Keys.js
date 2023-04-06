
/*
 * Any functions that deal with gathering keys. 
 */

export function getMessagesKey() {
    return process.env.REACT_APP_AES_PASSPHRASE_FOR_MESSAGES;
}