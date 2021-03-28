pragma solidity ^0.4.17;

contract arraydemo {

    int[] public array;

    function put(int i) public{
        array.push(i);
    }
    string public message;
    function arraydemo(string _message) public{
        message = _message;

    }
    function get_array() public view returns(int[]){
        return array;
    }

}
