// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface ISupergroups {
    struct SupergroupInfo {
        string[] artistIds;
        uint256 numberOfFollowers;
    }

    function safeMint(
        address to,
        string[] calldata artistIds,
        uint256 numberOfFollowers
    ) external;

    function burn(uint256 tokenId) external;

    function getSupergroupInfo(
        uint256 tokenId
    ) external view returns (SupergroupInfo memory);
}
