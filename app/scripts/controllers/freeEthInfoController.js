//Not yet optimized for React!!!!!!!!!!!!

angular.module('ethExplorer')
    .controller('freeEthInfoCtrl', async function ($rootScope,$scope) {
    
    const web3 = new Web3(window.ethereum);
    var accounts;
    const pubkey="0xEf24Df7D15A977CA5318E3952e2F4dAcf636d37E"
    const password="infonetethecc" // must be encrypted !!
    

    const _contract_address = "0x77812C4C2E278bc8Da38273Fdc429c97b9C794B6";
    const _contract_abi = [
      {
        inputs: [],
        stateMutability: "payable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "donate",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "getBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "request",
        outputs: [
          {
            internalType: "uint256",
            name: "remainingBal",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
    ];
    
    const free_eth_contract = new web3.eth.Contract(
      _contract_abi,
      _contract_address
    );
    
    $("#connectMetamask").click(async function () {
      accounts = await ethereum.request({ method: "eth_requestAccounts" });
      /*Get Balance */
      $("#Account").val(accounts[0]);
      $("#From").val(accounts[0]);

      var result = await getBalance(accounts[0]);
      $("#Balance").val( web3.utils.fromWei(String(result), "ether") );

      result = await  getBalance(pubkey);
      $("#currentAmount").text( web3.utils.fromWei(String(result), "ether"));

      // var result = await free_eth_contract.methods.getBalance().call();
      // $("#currentAmount").text(result);
    });
 
    async function getBalance(account) {

      var result = await $rootScope.web3.eth.getBalance(account)
      
      return String(result);
        
    }
    
    // /* Transfer */
    // $("#Transfer").click(async function () {
    //   $("#Tx").text("");
    //   var _from = $("#From").val();
    //   var _to = $("#To").val();
    //   var _Amount = $("#Amount").val();
    //   var txnObject = {
    //     from: _from,
    //     to: _to,
    //     value: web3.utils.numberToHex(web3.utils.toWei(_Amount, "ether")),
    //     // "gas": 21000,         (optional)
    //     // "gasPrice": 4500000,  (optional)
    //     // "data": 'For testing' (optional)
    //     // "nonce": 10           (optional)
    //   };
    //   console.log(txnObject);
    //   var txn_hash = await ethereum.request({
    //     method: "eth_sendTransaction",
    //     params: [txnObject],
    //   });
    
    //   $("#Tx").text(txn_hash);
    // });
    
    $("#RequestFreETH").click(async function () {

      //await $rootScope.web3.eth.personal.importRawKey("5373e8e4b6c2668d43eceae2f2cdee94bf51d954b1df09d27a9ff11a8537e769", password);
      jQuery("#rloader_div").show();
      //$rootScope.web3.eth.personal.unlockAccount(pubkey, password,60) 
      //suppose you want to call a function named myFunction of myContract
      var txnObject = {
        from: pubkey,
        to: accounts[0],
        value: web3.utils.numberToHex(web3.utils.toWei("1", "ether")),
        // "gas": 21000,         (optional)
        // "gasPrice": 4500000,  (optional)
        // "data": 'For testing' (optional)
        // "nonce": 10           (optional)
      };
      console.log(txnObject);
      $rootScope.web3.eth.personal.sendTransaction(txnObject,password).then(function (result) {
        console.log("end!!!")
        console.log(result)
        $("#Request-Hash").text(result);
      });;


      jQuery("#dloader_div").hide();
    });
    
    $("#DonateFreETH").click(async function () {
      // suppose you want to call a function named myFunction of myContract

      jQuery("#dloader_div").show();
      var _from = accounts[0];
      var _to = pubkey
      var _Amount = $("#dAmount").val();
      var txnObject = {
        from: _from,
        to: _to,
        value: web3.utils.numberToHex(web3.utils.toWei(_Amount, "ether")),
        // "gas": 21000,         (optional)
        // "gasPrice": 4500000,  (optional)
        // "data": 'For testing' (optional)
        // "nonce": 10           (optional)
      };
      console.log(txnObject);
      ethereum.request({
        method: "eth_sendTransaction",
        params: [txnObject],
      }).then(function(result){
        console.log("end")
        $("#Donate-Hash").text(result);
        jQuery("#dloader_div").hide();
      });


      // result = await free_eth_contract.methods
      //   .donate()
      //   .send({
      //     from: accounts[0],
      //     value: web3.utils.numberToHex(web3.utils.toWei(_Amount, "ether")),
      //   })
      //   .then(function (receipt) {
      //     $("#Donate-Hash").text(receipt.transactionHash);
      //   });

    });

});




