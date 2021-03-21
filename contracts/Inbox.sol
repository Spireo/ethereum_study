pragma solidity ^0.4.17.;
contract Inbox {

    string public message;  //声明变量类型和公开或私有
    function Inbox(string  _message) public{
        message = _message;
    }
    function setmessage(string  _message )  public {
        message = _message ;
    }
    function getMessage() public view returns(string) {   //return必须声明变量
        return message;
    }

}