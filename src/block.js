import CryptoJS from 'crypto-js';

class Block {

    constructor(time, hashPrev, hash, data) {
        this.time = time;
        this.hashPrev = hashPrev;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block -
            Time     : ${this.time}
            HashPrev : ${this.hashPrev.substring(this.hashPrev.length - 7)}
            Hash     : ${this.hash.substring(this.hash.length - 7)}
            Data     : ${this.data}
        `;
    }

    static genesis() {
        const time = 'Genesis time';
        const hashPrev = '------';
        const data = [];
        const hash = Block.calculateHash(time, hashPrev, data);
        return new this(time, hashPrev, hash, data);
    }

    static mineBlock(blockPrev, data) {
        const time = Date.now();
        const hashPrev = blockPrev.hash;
        const hash = Block.calculateHash(time, hashPrev, data);

        return new this(time, hashPrev, hash, data);
    }

    static calculateHash(time, hashPrev, data) {
        return CryptoJS.SHA256(`${time}${hashPrev}${data}`).toString();
    }

    static calculateBlockHash(block) {
        return Block.calculateHash(block.time, block.hashPrev, block.data);
    }
}

export default Block;