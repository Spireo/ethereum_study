const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');     //默许的规范：如果是大写那就是一个构造方法（不完整实例
const web3 = new Web3(ganache.provider());       //插卡，把ganache给插到web3里面

const {interface,bytecode} = require ('../compile1')

let contract;
let accounts;
beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    contract = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data:bytecode,
        arguments:'the gambit is on',
    }).send({
        from:accounts[0],
        gas:1000000
    });
})
describe('测试本合约',()=>{
    it('测试部署结果',async()=>{
        let enterresult = await contract.methods.enter().send({
            from:accounts[1],
            gas:1000000,
            value:1000000000000000000,
        })
        let balance = await contract.methods.getbalance().call();
        console.log(enterresult);
        console.log(balance);
    })
    it('获取信息',async()=>{
        let result = await contract.methods.getMessage().call();
        console.log(result);
    })
    it('catch me if i fall',async()=>{
        try{
            enterresult = await contract.methods.enter().send({
                from:accounts[1],
                gas:1000000,
                value:2000000000000000000,
            })
        }catch(error){
            assert.ok(error)
        }
    })
})