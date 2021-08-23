var Web3 = require('web3');  
const request = require('request');
const fs = require('fs');


let fundsAddres = "0x122ec44c3fC85d3F1dDd72d5FE940B7d61534465";
let fundsPK = "xxx";


var stakeBuy = 2n, stakeSell = 6n;
var totalBuyDis = 0n , totalSellDis = 0n;
var urlGet = "https://testnet.redditspace.com/api?module=account&action=tokentx&address=0x122ec44c3fC85d3F1dDd72d5FE940B7d61534465&contractaddress=0x138fAFa28a05A38f4d2658b12b0971221A7d5728&startblock=";

fs.readFile('lastBlock.txt', function(err, f){
    var array = f.toString().split('\n');
    urlGet = urlGet.concat(array[0])
    //calcMoonsDis(urlGet)
});



function calcMoonsDis(url){
request(url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  var txNum = body.result.length;
  var Buys = 0n ,Sells= 0n;
  var x=0;


  while(x < txNum){
    if(body.result[x].from == "0x122ec44c3fc85d3f1ddd72d5fe940b7d61534465"){
     
        Buys = Buys + BigInt(parseInt(body.result[x].value));
    }
    else{

        Sells = Sells + BigInt(parseInt(body.result[x].value));
    }
    x++;
  }
  totalBuyDis = Buys * stakeBuy  / 100n;
  totalSellDis = Sells * stakeSell  / 100n;
  console.log("BUYS    " +Buys);
  console.log("SELLS    " +Sells);
  console.log("Moons To Distirbute   " +totalBuyDis);
  console.log("Moons To Distirbute    " +totalSellDis);
  

  fs.writeFile("lastBlock.txt", body.result[0].blockNumber, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
  calcHolderStake(totalBuyDis+totalSellDis);
});

}


function calcHolderStake(totalMoons){


}

function distirbute(HoldersArray){
    const Common = require('ethereumjs-common');
    var Tx = require("ethereumjs-tx").Transaction
    const web3 = new Web3('https://testnet.redditspace.com/rpc');
    const ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
    const CONTRACT_ADDRESS = '0x138fAFa28a05A38f4d2658b12b0971221A7d5728';
    let myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
   
    web3.eth.getTransactionCount(fundsAddres).then(async function(v){ 


    
    for (let i = 0; i < HoldersArray.length; i++){
   
  console.log("1");
        
        
        var rawTransaction = {"from":fundsAddres,
        "chainId": web3.utils.toHex(5391184),
         "gasPrice":web3.utils.toHex(0),
         "gasLimit":web3.utils.toHex(21000),
         "to":CONTRACT_ADDRESS,
         "value":"0x0",
         "data":myContract.methods.transfer(HoldersArray[i], 10000000000000000n).encodeABI(),
         "nonce":web3.utils.toHex(v)} 

         v += 1;
        
         
         const common = Common.default.forCustomChain('mainnet', {
            name: 'eth',
            networkId: web3.utils.toHex(5391184),
            chainId: web3.utils.toHex(5391184)
          }, 'petersburg');
          
          const tx = new Tx(rawTransaction, {
            common
          });
         
        var privateKey = new Buffer.from(fundsPK, 'hex') 
    
        tx.sign(privateKey)
        
        var serializedTx = tx.serialize();
  
        await  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'),await async  function(err, hash) {
              if (!err)
                  {
                    console.log('Txn Sent and hash is '+hash);
                    
                   
                  }
              else
                  {
                    console.error(err);
                  }
            });
  
          
          
        }
    
    })
      
}


