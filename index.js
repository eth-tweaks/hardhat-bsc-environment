const { extendEnvironment } = require("hardhat/config");
const pancakeEnv = require("./pancake.js");

extendEnvironment(async (hre) => {
    hre.bscDeployer = async () => {
        const [deployer] = await hre.ethers.getSigners();
        
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.pancakeV2FactoryAddress,
            pancakeEnv.pancakeV2FactoryBytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV2FactoryAddress, 
            "0x0", 
            "0x0000000000000000000000000ed943ce24baebf257488771759f9bf482c39706"
        ])
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV2FactoryAddress, 
            "0x1", 
            "0x000000000000000000000000ceba60280fb0ecd9a5a26a1552b90944770a4a0e"
        ])
    
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.WETHAddress,
            pancakeEnv.WETHBytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.WETHAddress, 
            "0x0", 
            "0x5772617070656420424e42000000000000000000000000000000000000000016"
        ])
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.WETHAddress, 
            "0x1", 
            "0x57424e4200000000000000000000000000000000000000000000000000000008"
        ])
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.WETHAddress, 
            "0x2", 
            "0x0000000000000000000000000000000000000000000000000000000000000012"
        ])
    
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.pancakeV2RouterV2Address,
            pancakeEnv.pancakeV2RouterV2Bytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.pancakeV3FactoryAddress,
            pancakeEnv.pancakeV3FactoryBytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x0", 
            "0x000000000000000000000000518d9643160cfd6fe469bfbd3ba66fc8035a68a3"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x5", 
            "0x000000000000000000000000d93f5c7a894bb44bdc9231087c8e559502f737ed"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x18ea07d45b61092cf379823b7e255753fc01638d9bcaaef647c0748469d0c8cb", 
            "0x0000000000000000000000000000000000000000000000000000000000000032"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x1bd07f61ef326b4de236f5b68f225f46ff76ee2c375ae31a06da201c49c70c12", 
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x1ca239af1d44623dfaa87ee0cbbbe4bbeb2112df36e66deedafd694350d045cd", 
            "0x00000000000000000000000000000000000000000000000000000000000000c8"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x2cb06da9fad5bc9043c9933b28e89aaba34d84764c67113fa1d4256f6b23f755", 
            "0x0000000000000000000000000000000000000000000000000000000000000100"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x344a86d038cc67650617710ee5afca4f5d1ed60d199ecd86852cac7a55b2d3e5", 
            "0x000000000000000000000000000000000000000000000000000000000000000a"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x5ed261ce397475c8f8ccd7526f550ae383248415591df3d1b32ee25c9ab0af2e", 
            "0x0000000000000000000000000000000000000000000000000000000000000100"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0x6b16ef514f22b74729cbea5cc7babfecbdc2309e530ca716643d11fe929eed2e", 
            "0x0000000000000000000000000000000000000000000000000000000000000100"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3FactoryAddress, 
            "0xbed90d45c8c5fb2e8fcae0027c6e57da3d943cdb82d794c1080bce28e166f211", 
            "0x0000000000000000000000000000000000000000000000000000000000000100"
        ]);
    
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.pancakeV3PoolDeployerAddress,
            pancakeEnv.pancakeV3PoolDeployerBytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3PoolDeployerAddress, 
            "0x3", 
            "0x0000000000000000000000000bfbcf9fa4f9c56b0f40a671ad40e0805a091865"
        ]);
    
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.pancakeV3SwapRouterAddress,
            pancakeEnv.pancakeV3SwapRouterBytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3SwapRouterAddress, 
            "0x0", 
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ]);
    
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.pancakeV3NfpmAddress,
            pancakeEnv.pancakeV3NfpmBytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3NfpmAddress, 
            "0x2", 
            "0x000000000000000000000000000000000000000000000000000000000013a072"
        ]);
    
        await hre.ethers.provider.send("hardhat_setCode", [
            pancakeEnv.pancakeV3TokenDescriptorAddress,
            pancakeEnv.pancakeV3TokenDescriptorBytecode,
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3TokenDescriptorAddress, 
            "0x0", 
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3TokenDescriptorAddress, 
            "0x1", 
            "0x0000000000000000000000000000000000000000000000000000000000000045"
        ]);
    
        await hre.ethers.provider.send("hardhat_setStorageAt", [
            pancakeEnv.pancakeV3TokenDescriptorAddress, 
            "0x2", 
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ]);
    
        // // Добавляем контракты в hre, чтобы они были доступны глобально
        // hre.uniswap = {
        //     factory,
        //     deployer
        // };
    };

    // Автоматически вызываем деплой при запуске
    await hre.bscDeployer();
});
