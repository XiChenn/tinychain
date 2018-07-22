import Chain from '../src/chain';
import Block from '../src/block';

const chain = new Chain();
chain.addBlock("test");
chain.addBlock("test2");

for (let i = 0; i < chain.length(); i++) {
    console.log(chain.blocks[i].toString());
    //console.log(Block.calculateBlockHash(chain.blocks[i]));
}
