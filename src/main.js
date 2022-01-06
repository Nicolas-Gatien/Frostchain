const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('89a2bbe6647eb8b84d494719990c756cf36e32819e965f80d432f5798d3b02f2')
const myWalletAddress = myKey.getPublic('hex');

let frostchain = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10, "Ooga");
tx1.signTransaction(myKey);
frostchain.addTransaction(tx1);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);

console.log('\n Starting the miner...');
frostchain.minePendingTransactions(myWalletAddress);


console.log('\n Balance of Oog Booga is, ', frostchain.getBalanceOfAddress(myWalletAddress));