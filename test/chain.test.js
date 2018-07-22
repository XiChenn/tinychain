import Chain from '../src/chain';
import Block from "../src/block";

describe('Chain', () => {
   let chain;

   beforeEach(() => {
       chain = new Chain();
    });

   it('starts with genesis block', () => {
       expect(chain.blocks[0]).toEqual(Block.genesis());
   });

   it('adds a new block', () => {
       const data = 'foo';
       chain.addBlock(data);

       expect(chain.blocks.slice(-1)[0].data).toEqual(data);
       expect(chain.length()).toEqual(2);
       expect(chain.blocks[0].hash !== chain.blocks[1].hash);
   });

    it('validates a valid blocks', () => {
        chain.addBlock('foo');

        expect(chain.isValid()).toBe(true);
    });

    it('replaces the chain with the valid chain', () => {
        let chain2 = new Chain();
        chain2.addBlock("dummy");
        chain2.addBlock("dummy2");
        chain.replaceChain(chain2);

        expect(chain).toEqual(chain2);
    });

    it('does not replace the chain with the one of less or equal length', () => {
        let chain2 = new Chain();
        chain.addBlock("test-chain1");
        chain2.addBlock("test");

        chain.replaceChain(chain2);

        expect(chain).not.toEqual(chain2);
    });
});