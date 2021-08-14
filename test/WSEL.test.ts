import { ethers } from "hardhat";
import { expect } from "chai";
import { WSEL } from "../types/WSEL";

describe("WSEL", function () {
  before(async function () {
    this.WSEL = await ethers.getContractFactory("WSEL")
    this.signers = await ethers.getSigners()
    this.alice = this.signers[0]
    this.bob = this.signers[1]
    this.carol = this.signers[2]
  })

  beforeEach(async function () {
    this.wsel = (await this.WSEL.deploy()) as WSEL;
    await this.wsel.deployed()
  })

  it("should have correct name and symbol and decimal", async function () {
    const name = await this.wsel.name()
    const symbol = await this.wsel.symbol()
    const decimals = await this.wsel.decimals()
    expect(name, "Wrapped Selendra")
    expect(symbol, "WSEL")
    expect(decimals, "18")
  })

  it("should deposit", async function () {
    await this.wsel.connect(this.alice).deposit({
      value: "100"
    })
    await this.wsel.connect(this.bob).deposit({
      value: "1000"
    })
    // await expect(this.sushi.connect(this.bob).mint(this.carol.address, "1000", { from: this.bob.address })).to.be.revertedWith(
    //   "Ownable: caller is not the owner"
    // )
    const totalSupply = await this.wsel.totalSupply()
    const aliceBal = await this.wsel.balanceOf(this.alice.address)
    const bobBal = await this.wsel.balanceOf(this.bob.address)
    const carolBal = await this.wsel.balanceOf(this.carol.address)
    expect(totalSupply).to.equal("1100")
    expect(aliceBal).to.equal("100")
    expect(bobBal).to.equal("1000")
    expect(carolBal).to.equal("0")
  })

  // it("should supply token transfers properly", async function () {
  //   await this.sushi.mint(this.alice.address, "100")
  //   await this.sushi.mint(this.bob.address, "1000")
  //   await this.sushi.transfer(this.carol.address, "10")
  //   await this.sushi.connect(this.bob).transfer(this.carol.address, "100", {
  //     from: this.bob.address,
  //   })
  //   const totalSupply = await this.sushi.totalSupply()
  //   const aliceBal = await this.sushi.balanceOf(this.alice.address)
  //   const bobBal = await this.sushi.balanceOf(this.bob.address)
  //   const carolBal = await this.sushi.balanceOf(this.carol.address)
  //   expect(totalSupply, "1100")
  //   expect(aliceBal, "90")
  //   expect(bobBal, "900")
  //   expect(carolBal, "110")
  // })

  // it("should fail if you try to do bad transfers", async function () {
  //   await this.sushi.mint(this.alice.address, "100")
  //   await expect(this.sushi.transfer(this.carol.address, "110")).to.be.revertedWith("ERC20: transfer amount exceeds balance")
  //   await expect(this.sushi.connect(this.bob).transfer(this.carol.address, "1", { from: this.bob.address })).to.be.revertedWith(
  //     "ERC20: transfer amount exceeds balance"
  //   )
  // })
});
