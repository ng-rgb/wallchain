pragma solidity ^0.8.17;

import "./ERC1155Token.sol";

contract FactoryERC1155 is Ownable {
    ERC1155Token[] public tokens; //an array that contains different ERC1155 tokens deployed
    mapping(uint256 => address) public indexToContract; //index to contract address mapping
    mapping(uint256 => address) public indexToOwner; //index to ERC1155 owner address

    event ERC1155Created(address owner, address tokenContract); //emitted when ERC1155 token is deployed
    event ERC1155Minted(address owner, address tokenContract); //emmited when ERC1155 token is minted
    event ERC1155TypeAdded(uint index, uint _id); //emmited when a new type is added to a ERC1155

    /*
    deployERC1155 - deploys a ERC1155 token with given parameters - returns deployed address

    _contractName - name of our ERC1155 token
    _uri - URI resolving to our hosted metadata
    _ids - IDs the ERC1155 token should contain
    _name - Names each ID should map to. Case-sensitive.
    _owners - Owners of each erc1155 types for this tokens
    */
    function deployERC1155(
        string memory _contractName,
        string memory _uri,
        uint[] memory _ids,
        string[] memory _names,
        address[] memory _owners
    ) public onlyOwner returns (address) {
        
        require(_names.length == _owners.length);
        require(_names.length == _ids.length);

        ERC1155Token t = new ERC1155Token(_contractName, _uri, _names, _ids, _owners);
        tokens.push(t);
        indexToContract[tokens.length - 1] = address(t);
        indexToOwner[tokens.length - 1] = tx.origin;
        emit ERC1155Created(msg.sender, address(t));
        return address(t);
    }

    /*
    addTypeToERC1155 - add a new type to an existing ERC1155 token

    _index - index position in our tokens array - represents which ERC1155 you want to interact with
    _name - Case-sensitive. Name of the token (this maps to the ID you created when deploying the token)
    _amount - amount of tokens you wish to mint
    */
    function addTypeToERC1155(
        uint _index,
        string memory _name,
        uint _id,
        address _owner
    ) public onlyOwner {
        tokens[_index].addNewType(_name, _id, _owner);
        emit ERC1155TypeAdded(_index, _id);
    }

    /*
    mintERC1155 - mints a ERC1155 token with given parameters

    _index - index position in our tokens array - represents which ERC1155 you want to interact with
    _name - Case-sensitive. Name of the token (this maps to the ID you created when deploying the token)
    _amount - amount of tokens you wish to mint
    */
    function mintERC1155(uint _index, string memory _name) public onlyOwner {
        uint id = getIdByName(_index, _name);
        require(
            tokens[_index].balanceOf(indexToOwner[_index], id) == 0,
            "Circulating supply is already 1"
        );
        tokens[_index].mint(id);
        emit ERC1155Minted(tokens[_index].owners(id), address(tokens[_index]));
    }

    /*
    Helper functions below retrieve contract data given an ID or name and index in the tokens array.
    */
    function getCountERC1155byIndex(uint256 _index, uint256 _id)
        public
        view
        returns (uint amount)
    {
        return tokens[_index].balanceOf(indexToOwner[_index], _id);
    }

    function getCountERC1155byName(uint256 _index, string calldata _name)
        public
        view
        returns (uint amount)
    {
        uint id = getIdByName(_index, _name);
        return tokens[_index].balanceOf(indexToOwner[_index], id);
    }

    function getIdByName(uint _index, string memory _name)
        public
        view
        returns (uint)
    {
        return tokens[_index].nameToId(_name);
    }

    function getNameById(uint _index, uint _id)
        public
        view
        returns (string memory)
    {
        return tokens[_index].idToName(_id);
    }

    function getERC1155byIndexAndId(uint _index, uint _id)
        public
        view
        returns (
            address _contract,
            address _owner,
            string memory _uri,
            uint supply
        )
    {
        ERC1155Token token = tokens[_index];
        return (
            address(token),
            token.owner(),
            token.uri(_id),
            token.balanceOf(indexToOwner[_index], _id)
        );
    }

    function getERC1155TypesLength(uint _index) public view returns (uint) {
        return tokens[_index].getTypesLength();
    }
}
