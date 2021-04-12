pragma solidity ^0.4.17;

contract emptywarehousebiding {
    function emptywarehousebiding1(string _message) returns(uint){
        if(keccak256(_message) == keccak256('getBlocknum')){
            return block.number;     //调用以太坊api获取最新区块号即区块高度
        }
    }
    ///@param owner 相应的账户拥有者的地址
    struct Farmer{
        uint fid;
        address owner;
        uint fieldarea;
    }
    mapping(uint=>Farmer) farmers;

    event CreateFarmerAccount(address owner,uint filedarea);

    function createfarmer(address _owner,uint _fid,uint _fieldarea) public {
        farmers[_fid] = Farmer({
        fid:_fid,
        owner:_owner,
        fieldarea:_fieldarea
        });
        emit CreateFarmerAccount(_owner,_fieldarea);
    }
}






