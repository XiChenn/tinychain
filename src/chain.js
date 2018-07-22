import Block from './block';

class Chain {

    constructor() {
        this.blocks = [Block.genesis()];
    }

    addBlock(data) {
        const lastBlock = this.blocks.slice(-1)[0];
        const block = Block.mineBlock(lastBlock, data);
        this.blocks.push(block);

        return block;
    }

    length() {
        return this.blocks.length;
    }

    isValid() {
        if(JSON.stringify(this.blocks[0]) !== JSON.stringify((Block.genesis()))) {
            return false;
        }

        for (let i = 1; i < this.length(); i++) {
            const blockPrev = this.blocks[i - 1];
            const block = this.blocks[i];
            if (block.hashPrev !== blockPrev.hash ||
                block.hashPrev !== Block.calculateBlockHash(blockPrev) ||
                block.hash !== Block.calculateBlockHash(block)) {

                return false;
            }
        }

        return true;
    }

    // If another miner submit a long chain, replace the current chain with the incoming one
    replaceChain(newChain) {
        if(newChain.length() <= this.length()) {
            return;
        }

        if(!newChain.isValid()) {
            return;
        }

        this.blocks = newChain.blocks;
    }
}

export default Chain;
