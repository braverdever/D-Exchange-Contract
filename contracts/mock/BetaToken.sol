pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BetaToken is ERC20, Ownable {
    uint256 public mintCap;

    event MintCapUpdated(uint256 newCap);

    constructor(string memory name, string memory symbol, uint256 _mintCap) ERC20(name, symbol) {
        require(_mintCap > 0, "Mint cap must be greater than zero");
        mintCap = _mintCap;
    }

    function mint(address to, uint256 amount) public {
        if (msg.sender != owner()) {
            require(amount <= mintCap, "Mint amount exceeds cap");
        }
        _mint(to, amount);
    }

    function setMintCap(uint256 newCap) external onlyOwner {
        require(newCap > 0, "Mint cap must be greater than zero");
        mintCap = newCap;
        emit MintCapUpdated(newCap);
    }
}
