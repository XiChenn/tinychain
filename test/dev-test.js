import Chain from '../src/chain';

const chain = new Chain();

for (let i = 0; i < 10; i++) {
    console.log(chain.addBlock(`foo ${i}`).toString());
}

