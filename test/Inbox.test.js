const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');     //默许的规范：如果是大写那就是一个构造方法（不完整实例
const web3 = new Web3(ganache.provider());       //插卡，把ganache给插到web3里面

const {interface,bytecode} = require ('../compile')
describe('测试智能合约',function(){
    this.timeout(15000);
    it('测试web3的版本',()=>{
        console.log(web3.version);
    })

    it('测试api',async()=>{
        //console.log(web3.currentProvider);

        let hex = web3.utils.fromAscii('the way you walk to me')
        console.log(hex)
        let str = web3.utils.toAscii('0x7468652077617920796f752077616c6b20746f206d6500000000000000000000')
        console.log(str)
        const accounts =  await web3.eth.getAccounts();
        console.log(accounts)
    })
    it('部署合约',async()=>{
        const accounts =  await web3.eth.getAccounts();
        const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
            data:bytecode,
            arguments:['みうぼられス']
        }).send({
            from:accounts[0],
            gas:1000000
        });
        console.log('text is :'+result.options.address);
        const message = await result.methods.getMessage().call();
        console.log(message)
        assert.equal(message,'みうぼられス')
        await result.methods.setmessage('宿命的战争').send({
            from:accounts[0],
            gas:1000000
        })
        let message1 = await result.methods.getMessage().call();
        console.log(message1);
        assert.equal(message1,'宿命的战争');
    })


})