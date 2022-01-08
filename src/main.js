const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//#region Generating Wallets
const key1 = ec.keyFromPrivate('89a2bbe6647eb8b84d494719990c756cf36e32819e965f80d432f5798d3b02f2')
const address1 = key1.getPublic('hex');

const key2 = ec.keyFromPrivate('c4e303ddf1900e372925d059744d08a45cca1bdf22b4d2733b0c63cd6eff4b48')
const address2 = key2.getPublic('hex');

const key3 = ec.keyFromPrivate('c536d844bf7d353b9cbaf431790aa8bf8c934ba888ab0a6f465d139698e38b7e')
const address3 = key3.getPublic('hex');

const key4 = ec.keyFromPrivate('52d7c97b108f0bf8ccb29a13c9c2c315d60d80797b4c7536a3f31e85eb7af805')
const address4 = key4.getPublic('hex');

const key5 = ec.keyFromPrivate('029fab1d3c3a954d38968125f2e9b61a9585b3076a7f350b3ca1be5e8170c142')
const address5 = key5.getPublic('hex');
//#endregion

let frostchain = new Blockchain();

//#region Give a balance to each wallet
console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address1);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address2);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address3);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address4);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address5);
//#endregion


const tx1 = new Transaction(address1, address2, 10, "Ooga");
tx1.signTransaction(key1);
frostchain.addTransaction(tx1);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address1);

console.log('\n Balance of public key goes here is, ', frostchain.getBalanceOfAddress(address2));

const tx2 = new Transaction(address2, address1, 20, "Ooga");
tx2.signTransaction(key2);
frostchain.addTransaction(tx2);
console.log('\n Balance of public key goes here is, ', frostchain.getBalanceOfAddress(address2));

const tx3 = new Transaction(address1, address2, 30, "Ooga");
tx3.signTransaction(key1);
frostchain.addTransaction(tx3);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address1);

const tx4 = new Transaction(address2, address1, 20, "Ooga");
tx4.signTransaction(key2);
frostchain.addTransaction(tx4);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(address1);

console.log('\n Balance of public key goes here is, ', frostchain.getBalanceOfAddress(address2));
console.log('\n Balance of myWalletAddress, ', frostchain.getBalanceOfAddress(address1));