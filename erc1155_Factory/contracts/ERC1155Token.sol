pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ERC1155Token is ERC1155, Ownable {
    string[] public names; //string array of names
    uint[] public ids; //uint array of ids
    string public baseMetadataURI; //the token metadata URI
    string public name; //the token mame
    uint public mintFee = 0 wei; //mintfee, 0 by default. only used in mint function, not batch.

    mapping(string => uint) public nameToId; //name to id mapping
    mapping(uint => string) public idToName; //id to name mapping
    mapping(uint => address) public owners;

    /*
    constructor is executed when the factory contract calls its own deployERC1155 method
    */
    constructor(
        string memory _contractName,
        string memory _uri,
        string[] memory _names,
        uint[] memory _ids,
        address[] memory _owners
    ) ERC1155(_uri) {
        names = _names;
        ids = _ids;
        _createMapping(_owners);
        setURI(_uri);
        baseMetadataURI = _uri;
        name = _contractName;
    }

    /*
    Add a new type to the token
    */
    function addNewType(string memory _name, uint _id, address _owner) public onlyOwner {
        ids.push(_id);
        names.push(_name);
        _updateMapping(_owner);
    }

    /*
    creates a mapping of strings to ids (i.e ["one","two"], [1,2] - "one" maps to 1, vice versa.)
    */
    function _createMapping(address[] memory _owners) private {
        for (uint i = 0; i < ids.length; i++) {
            nameToId[names[i]] = ids[i];
            idToName[ids[i]] = names[i];
            owners[ids[i]] = _owners[i];
        }
    }

    /*
    Update a mapping of strings to ids (i.e ["one","two"], [1,2] - "one" maps to 1, vice versa.)
    */
    function _updateMapping(address _owner) private {
        nameToId[names[ids.length - 1]] = ids[ids.length - 1];
        idToName[ids[ids.length - 1]] = names[ids.length - 1];
        owners[ids[ids.length - 1]] = _owner;
    }

    /*
    sets our URI and makes the ERC1155 OpenSea compatible
    */
    function uri(uint256 _tokenid)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    baseMetadataURI,
                    "/metadata/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }

    function getNames() public view returns (string[] memory) {
        return names;
    }

    function getTypesLength() public view returns (uint) {
        return names.length;
    }

    /*
    used to change metadata, only owner access
    */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /*
    set a mint fee. only used for mint, not batch.
    */
    function setFee(uint _fee) public onlyOwner {
        mintFee = _fee;
    }

    /*
    mint(address account, uint _id, uint256 amount)

    account - address to mint the token to
    _id - the ID being minted
    amount - amount of tokens to mint
    */
    function mint(uint _id) public payable returns (uint) {
        require(msg.value == mintFee);
        _mint(owners[_id], _id, 1, "");
        return _id;
    }

    /*
    mintBatch(address to, uint256[] memory _ids, uint256[] memory amounts, bytes memory data)

    to - address to mint the token to
    _ids - the IDs being minted
    amounts - amount of tokens to mint given ID
    bytes - additional field to pass data to function
    */
    // function mintBatch(
    //     address to,
    //     uint256[] memory _ids,
    //     uint256[] memory amounts,
    //     bytes memory data
    // ) public {
    //     _mintBatch(to, _ids, amounts, data);
    // }

    /**
     * Overwrite to remove transfer feature
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        revert("Transfer is not supported");
    }

    /**
     *  Overwrite to remove transfer feature
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        revert("Transfer is not supported");
    }
}
