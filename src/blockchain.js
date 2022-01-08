const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{
    constructor(fromAddress, toAddress, amount, attachedMessage){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.attachedMessage = attachedMessage;
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transactions for other wallets!');
        }
        
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(){
        if(this.fromAddress == null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction!')
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }

    calculateHash(){
        return SHA256(this.timestamp + this.nounce + this.previousHash + JSON.stringify(this.transactions)).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nounce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined " + this.hash);
    }

    hasValidTransactions(){
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }

        return true;
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 1000;
    }

    createGenesisBlock(){
        return new Block("2022/01/06", "Genesis block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){ // People could change this code here to give yourself more coins, but blockchains are a peer to peer network, so people would just refuse.
        let block = new Block(Date.now(), this.pendingTransactions);
        // In reality miners choose which block they're going to mine
        block.mineBlock(this.difficulty);
        
        console.log('Block successfully mined');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

     addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            console.log('Transaction must include from and to address!');
        }else if(!transaction.isValid()){
            console.log('Cannot add invalid transaction to chain!')
        }else if(transaction.amount >= this.getBalanceOfAddress(transaction.fromAddress)){
            console.log("Not enough funds in account! ", transaction.fromAddress)
        }else{
            this.pendingTransactions.push(transaction);
        }
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            if(!currentBlock.hasValidTransactions()){
                return false;
            }
        }

        return true;
        // Need to rollback blockchain
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;