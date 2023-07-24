const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);

    const singer1 = ethers.provider.getSigner(1);

    const singer2 = ethers.provider.getSigner(2);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer,singer1,singer2 };
  }

  it('should be a winner', async function () {
    const { game, signer,singer1,singer2 } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: '10' });

    await game.connect(singer1).buy({ value: '20'});

    await game.connect(singer2).buy({ value: '1'});
    
    // TODO: win expects three arguments
    
    const addr = await signer.getAddress();

    const addr1 = await singer1.getAddress();

    const addr2 = await singer2.getAddress();

    await game.win(addr,addr1,addr2);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
