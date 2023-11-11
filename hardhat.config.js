require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.12",
  networks:{
    hardhat:{},
    polygon_mumbai:{
      url:"https://polygon-mumbai.g.alchemy.com/v2/gOENwjG53S_odY-c51ru6Nmpv978SJ1l",
      accounts:[
        `0x${"494f5b86efc6059b7ac90b52df320d65ab7e482c785320d6d7ce69af49bb4173"}`,
      ],
    },
  },
};
