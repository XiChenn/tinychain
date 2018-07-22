import CryptoJS from 'crypto-js';

import { DIFFICULTY, EXPECTED_MINING_TIME } from '../config';

class Block {

    constructor(time, hashPrev, hash, data, bits, nonce) {
        this.time = time;
        this.hashPrev = hashPrev;
        this.hash = hash;
        this.data = data;
        this.bits = bits; // Number of bits for the preceding zeros
        this.nonce = nonce;
    }

    toString() {
        return `Block -
            Time     : ${this.time}
            HashPrev : ${this.hashPrev.substring(0, 10)}
            Hash     : ${this.hash.substring(0, 10)}
            Data     : ${this.data}
            Bits     : ${this.bits}
            Nonce    : ${this.nonce}
        `;
    }

    // Proof of Work: Find a nonce such that the hash has preceding DIFFICULTY zeros
    static pow(time, hashPrev, data, difficulty) {
        for (let nonce = 0; ; nonce++) {
            let hash = Block.calculateHash(time, hashPrev, data, difficulty, nonce);
            if (hash.substring(0, difficulty) === '0'.repeat(difficulty)) {
                return { hash: hash, nonce: nonce };
            }
        }
    }

    // Generate dynamic difficulty based on the previous mining time
    static adjustDifficulty(currentTime, blockPrev) {
        let difficulty = blockPrev.bits;
        if (currentTime - blockPrev.time < EXPECTED_MINING_TIME) { // Was mining too fast
            difficulty++;
        } else {
            difficulty = Math.max(difficulty - 1, 0);
        }
        return difficulty;
    }

    static genesis() {
        const time = 'Genesis time';
        const hashPrev = '------';
        const data = [];

        const { hash, nonce } = this.pow(time, hashPrev, data, DIFFICULTY);

        return new this(time, hashPrev, hash, data, DIFFICULTY, nonce);
    }

    static mineBlock(blockPrev, data) {
        const time = Date.now();
        const hashPrev = blockPrev.hash;

        const difficulty = this.adjustDifficulty(time, blockPrev);

        const { hash, nonce } = this.pow(time, hashPrev, data, difficulty);

        return new this(time, hashPrev, hash, data, difficulty, nonce);
    }

    static calculateHash(time, hashPrev, data, bits, nonce) {
        return CryptoJS.SHA256(`${time}${hashPrev}${data}${bits}${nonce}`).toString();
    }

    static calculateBlockHash(block) {
        return Block.calculateHash(block.time, block.hashPrev, block.data, block.bits, block.nonce);
    }
}

export default Block;