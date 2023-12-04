// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import {ISupergroups} from "./interfaces/ISupergroups.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IRoyalties} from "./interfaces/IRoyalties.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./Constants.sol";

/**
 * @title ARockstarAteMyNFT
 * @notice This is the main contract for A Rockstar Ate My NFT project
 * @dev todo
 */
contract ARockstarAteMyNFT is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    event Log(bytes message);

    uint64 private _subscriptionId = 765;

    struct CreateSupergroupRequest {
        address sender;
        string[] artistIds;
    }

    struct DisbandSupergroupRequest {
        uint256 tokenId;
    }

    mapping(bytes32 => CreateSupergroupRequest)
        private _createSupergroupRequests;
    mapping(bytes32 => DisbandSupergroupRequest)
        private _disbandSupergroupRequests;

    // Custom error type
    error UnexpectedRequestID(bytes32 requestId);

    // Router address - Hardcoded for Mumbai
    // Check to get the router address for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    address router = 0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C;

    // donID - Hardcoded for Mumbai
    // Check to get the donID for your supported network https://docs.chain.link/chainlink-functions/supported-networks
    bytes32 donID =
        0x66756e2d706f6c79676f6e2d6d756d6261692d31000000000000000000000000;

    address private _supergroupsAddress;
    address private _royaltiesAddress;

    // constructor

    /**
     * @notice Initializes the contract with the Chainlink router address and sets the contract owner
     */
    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    // receive functions

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        require(err.length == 0, string(err)); // TODO: HANDLE THIS BETTER?
        require(requestId.length > 0, "requestId is zero");
        uint256 currentFollowers = uint256(bytes32(response));

        // If this is a create supergroup request
        if (_createSupergroupRequests[requestId].sender != address(0)) {
            // Mint a token with the requested data
            ISupergroups(_supergroupsAddress).safeMint(
                _createSupergroupRequests[requestId].sender,
                _createSupergroupRequests[requestId].artistIds,
                currentFollowers
            );
        }
        // If this is a disband supergroup request
        else if (_disbandSupergroupRequests[requestId].tokenId != 0) {
            uint256 tokenId = _disbandSupergroupRequests[requestId].tokenId;
            uint256 startNumberOfFollowers = ISupergroups(_supergroupsAddress)
                .getSupergroupInfo(tokenId)
                .numberOfFollowers;
            int256 royalties = int256(
                currentFollowers - startNumberOfFollowers
            );
            if (royalties > 0) {
                // Burn the token
                address owner = IERC721(_supergroupsAddress).ownerOf(tokenId);
                IRoyalties(_royaltiesAddress).mint(owner, uint256(royalties));
            }
            ISupergroups(_supergroupsAddress).burn(tokenId);
        } else {
            revert UnexpectedRequestID(requestId);
        }
    }

    // fallback functions
    // external functions

    /**
     * @notice Sets the address of the Royalties contract
     * @param royaltiesAddress The address of the Royalties contract
     */
    function setRoyaltiesAddress(address royaltiesAddress) external onlyOwner {
        _royaltiesAddress = royaltiesAddress;
    }

    /**
     * @notice Sets the address of the Supergroups contract
     * @param supergroupsAddress The address of the Supergroups contract
     */
    function setSupergroupsAddress(
        address supergroupsAddress
    ) external onlyOwner {
        _supergroupsAddress = supergroupsAddress;
    }

    /**
     * @notice Sets the subscriptionId of the Chainlink Function
     * @param subscriptionId The ID of the subscription
     */
    function setSubscriptionId(uint64 subscriptionId) external onlyOwner {
        _subscriptionId = subscriptionId;
    }

    /**
     * @notice Function to initiate Supergroup creation
     * @param args Arguments for the chainlink request
     * args[0], accessToken: The access token for the Spotify API
     * args[1], artistId: The ID of the first artist in the supergroup
     * args[2], artistId: The ID of the second artist in the supergroup
     */
    function createSupergroup(string[] calldata args) external payable {
        // require payment
        // make request to get spotify score
        bytes32 requestId = sendRequest(args);
        _createSupergroupRequests[requestId].sender = msg.sender;
        string[] memory artistIds = new string[](2);
        artistIds[0] = args[1];
        artistIds[1] = args[2];
        _createSupergroupRequests[requestId].artistIds = artistIds;
    }

    /**
     * @notice Function to sell Supergroup
     * @param accessToken Token for spotify call
     * @param tokenId Token ID of the supergroup to sell
     */
    function sellSupergroup(
        string calldata accessToken,
        uint256 tokenId
    ) external payable {
        // Sender must own token
        address owner = IERC721(_supergroupsAddress).ownerOf(tokenId);
        require(owner == msg.sender, "Sender must own token");
        string[] memory args = new string[](3);
        args[0] = accessToken;
        args[1] = ISupergroups(_supergroupsAddress)
            .getSupergroupInfo(tokenId)
            .artistIds[0];
        args[2] = ISupergroups(_supergroupsAddress)
            .getSupergroupInfo(tokenId)
            .artistIds[1];
        // make request to get spotify score
        bytes32 requestId = sendRequest(args);
        _disbandSupergroupRequests[requestId].tokenId = tokenId;
    }

    // public functions
    // internal functions

    /**
     * @notice Sends an HTTP request for Spotify data
     * @param args Arguments for the chainlink request
     * 0 - accessToken: The access token for the Spotify API
     * 1, 2 - artistIds: An array of IDs for each artist in the supergroup
     */
    function sendRequest(
        string[] memory args
    ) internal returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        // Initialize the request with JS code
        req.initializeRequestForInlineJavaScript(_javascriptSource);
        // Set the args for the request
        req.setArgs(args);
        // Send the request and store the request ID
        uint32 gasLimit = 300000;
        return _sendRequest(req.encodeCBOR(), _subscriptionId, gasLimit, donID);
    }

    // private functions
}
