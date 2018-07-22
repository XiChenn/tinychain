import Block from '../src/block';

describe('Block', () => {
    let data, blockPrev, block;

    beforeEach(() => {
        data = 'bar';
        blockPrev = Block.genesis();
        block = Block.mineBlock(blockPrev, data);
    });

    it('sets the `data` to match the input', () => {
       expect(block.data).toEqual(data);
    });

    it('sets the `hashPrev` to match the hash of the last block', () => {
       expect(block.hashPrev).toEqual(blockPrev.hash);
    });

    it('generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.bits)).toEqual('0'.repeat(block.bits));
    });

    it('lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block.time + 360000, block)).toEqual(block.bits - 1);
    });

    it('raises the difficulty for fast mined blocks', () => {
        expect(Block.adjustDifficulty(block.time + 1, block)).toEqual(block.bits + 1);
    });
});