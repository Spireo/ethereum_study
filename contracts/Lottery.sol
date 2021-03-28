pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    function Lottery()public{
        manager = msg.sender;
    }
    function get_manager()public view returns(address){
        return manager;
    }
    //投注函数
    function enter() public payable{
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }
    //查询使用者地址
    function queryplyers() public view returns(address[]){
        return players;
    }
    //获取当前合约内的金钱数量
    function getbalance() public view returns(uint){
        return this.balance;
    }
    function getplayercounts()public view returns(uint){
        return players.length;
    }
    function random() public view returns(uint){
        return uint(sha256(block.difficulty,now,players));
    }
    function getresult()public returns(address){
        require(msg.sender == manager);
        uint result = random() % players.length;
        address winner =  players[result];
        winner.transfer(this.balance);
        players = new address[](0);
        return winner;
    }
}
