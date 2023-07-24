const { loadFixture,setBalance } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
     let threshold = '0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf';
     let randomWallet ;
     while(true){
        randomWallet = ethers.Wallet.createRandom().connect(ethers.provider);
        if(randomWallet.address < threshold){
            break;
        }
     }
     console.log('findAddr:',randomWallet.address);
      // Fund randomWallet with 1 ETH
     await setBalance(randomWallet.address, ethers.utils.parseEther("1"));

    await game.connect(randomWallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
