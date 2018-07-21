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
});