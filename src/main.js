const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('89a2bbe6647eb8b84d494719990c756cf36e32819e965f80d432f5798d3b02f2')
const myWalletAddress = myKey.getPublic('hex');

const otherKey = ec.keyFromPrivate('c4e303ddf1900e372925d059744d08a45cca1bdf22b4d2733b0c63cd6eff4b48')
const otherWalletAddress = otherKey.getPublic('hex');

let frostchain = new Blockchain();

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, otherWalletAddress, 10, "Ooga");
tx1.signTransaction(myKey);
frostchain.addTransaction(tx1);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);

console.log('\n Balance of public key goes here is, ', frostchain.getBalanceOfAddress(otherWalletAddress));

const tx2 = new Transaction(otherWalletAddress, myWalletAddress, 20, "Ooga");
tx2.signTransaction(otherKey);
frostchain.addTransaction(tx2);
console.log('\n Balance of public key goes here is, ', frostchain.getBalanceOfAddress(otherWalletAddress));

const tx3 = new Transaction(myWalletAddress, otherWalletAddress, 30, "Ooga");
tx3.signTransaction(myKey);
frostchain.addTransaction(tx3);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);

const tx4 = new Transaction(otherWalletAddress, myWalletAddress, 20, "Ooga");
tx4.signTransaction(otherKey);
frostchain.addTransaction(tx4);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);

console.log('\n Balance of public key goes here is, ', frostchain.getBalanceOfAddress(otherWalletAddress));
console.log('\n Balance of myWalletAddress, ', frostchain.getBalanceOfAddress(myWalletAddress));