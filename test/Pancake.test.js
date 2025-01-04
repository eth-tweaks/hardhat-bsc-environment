const { expect } = require("chai");
const hre = require("hardhat");
const { SnapshotRestorer, takeSnapshot } = require('@nomicfoundation/hardhat-network-helpers');

let factoryV2;
let snapshot;

const maxUint = hre.ethers.MaxUint256;

describe("Pancake", () => {
    before(async () => {
        [admin, alice, bob] = await hre.ethers.getSigners();

        factoryV2 = await hre.ethers.getContractAt("IPancakeFactory", "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73");
        routerV2 = await hre.ethers.getContractAt("IPancakeRouter02", "0x10ED43C718714eb63d5aA57B78B54704E256024E");
        weth = await hre.ethers.getContractAt("IERC20Metadata", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");

        factoryV3 = await hre.ethers.getContractAt("IPancakeV3Factory", "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865");
        nfpm = await hre.ethers.getContractAt("INonfungiblePositionManager", "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364");
        swapRouter = await hre.ethers.getContractAt("ISwapRouter", "0x1b81D678ffb9C0263b24A97847620C99d213eB14");

        const Token = await hre.ethers.getContractFactory("MockToken");
        token0 = await Token.deploy("Mock Token 0", "MT0", await hre.ethers.parseEther("1"));
        token1 = await Token.deploy("Mock Token 1", "MT1", await hre.ethers.parseEther("1"));
        [token0, token1] = token0.target < token1.target ? [token0, token1] : [token1, token0];
    })

    beforeEach(async () => {
        snapshot = await takeSnapshot();
    })

    afterEach(async () => {
        await snapshot.restore();
    })

    describe("pancake v2", () => {
        it("correct feeTo and feeToSetter", async () => {
            expect(await factoryV2.feeTo()).to.equal("0x0ED943Ce24BaEBf257488771759F9BF482C39706");
            expect(await factoryV2.feeToSetter()).to.equal("0xcEba60280fb0ecd9A5A26A1552B90944770a4a0e");
        });

        it("correct weth and factory for the router", async () => {
            expect(await routerV2.WETH()).to.equal("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
            expect(await routerV2.factory()).to.equal("0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73");
        });

        it("correct weth contract", async () => {
            expect(await weth.name()).to.equal("Wrapped BNB");
            expect(await weth.symbol()).to.equal("WBNB");
            expect(await weth.decimals()).to.equal(18);
        });

        it("correct pair address", async () => {
            const pairAddress = await factoryV2.createPair.staticCall(token0.target, token1.target);
            await factoryV2.createPair(token0.target, token1.target);

            const pair = await hre.ethers.getContractAt("IPancakePair", pairAddress);
            expect(await pair.factory()).to.equal(factoryV2.target);
            let reserves = await pair.getReserves();
            expect(reserves.reserve0).to.equal(0);
            expect(reserves.reserve1).to.equal(0);

            const amount = await hre.ethers.parseEther("0.1");

            await token0.approve(routerV2.target, amount);
            await token1.approve(routerV2.target, amount);

            await routerV2.addLiquidity(
                token0.target,
                token1.target,
                amount,
                amount,
                0,
                0,
                admin.address,
                maxUint
            )

            reserves = await pair.getReserves();
            expect(reserves.reserve0).to.equal(amount);
            expect(reserves.reserve1).to.equal(amount);
        });
    })

    describe("pancake v3", () => {
        it("correct owner, pool deployer and lmPoolDeployer", async () => {
            expect(await factoryV3.owner()).to.equal("0x518D9643160cFd6FE469BFBd3BA66fC8035a68a3");
            expect(await factoryV3.poolDeployer()).to.equal("0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9");
            expect(await factoryV3.lmPoolDeployer()).to.equal("0xd93F5c7A894bb44BDc9231087c8E559502f737eD");
        });

        it("could create pool, initialize and swap", async () => {
            const poolAddress = await factoryV3.createPool.staticCall(token0.target, token1.target, 100);
            await factoryV3.createPool(token0.target, token1.target, 100);

            const pool = await hre.ethers.getContractAt("IPancakeV3Pool", poolAddress);
            let slot0 = await pool.slot0();
            expect(slot0.unlocked).to.equal(false);

            await pool.initialize("0x01000000000000000000000000");
            slot0 = await pool.slot0();
            expect(slot0.unlocked).to.equal(true);

            const maxTick = 887272;
            let amount = await hre.ethers.parseEther("0.5");

            await token0.approve(nfpm.target, amount);
            await token1.approve(nfpm.target, amount);

            const position = await nfpm.mint.staticCall([token0.target, token1.target, 100, -maxTick, maxTick, amount, amount, 0, 0, admin.address, maxUint]);
            await nfpm.mint([token0.target, token1.target, 100, -maxTick, maxTick, amount, amount, 0, 0, admin.address, maxUint]);

            expect(await token0.balanceOf(admin.address)).to.equal(amount);
            expect(await token1.balanceOf(admin.address)).to.equal(amount);

            amount = await hre.ethers.parseEther("0.25");
            await token0.approve(swapRouter.target, amount);

            await swapRouter.exactInputSingle([
                token0.target,
                token1.target,
                100,
                admin.address,
                maxUint,
                amount,
                0,
                0
            ]);

            expect(await token0.balanceOf(admin.address)).to.equal(amount);
            expect(await token1.balanceOf(admin.address)).to.equal("666655555185172809");

        });

    });
});
