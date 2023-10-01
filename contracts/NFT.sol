// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFT {
    // Define the NFT structure
    struct NFT {
        string metadata;
    }

    // Array to store NFTs
    NFT[] public nfts;

    // Function to mint a new NFT
    function mint(string memory _metadata) public {
        NFT memory newNFT = NFT(_metadata);
        nfts.push(newNFT);
    }

    // Function to get the metadata of an NFT
    function getNFT(uint256 _id) public view returns (string memory) {
        return nfts[_id].metadata;
    }
}
