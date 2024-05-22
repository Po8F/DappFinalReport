
$(document).ready(function() {
    async function getNetworkName(chainId) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);    
        const network = await provider.getNetwork();
        return network.name || 'Unknown Network';
    }
    async function updateNetworkName() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (provider) {
            provider.on('network', async (newNetwork, oldNetwork) => {
                if (oldNetwork) {
                    const networkName = await getNetworkName(newNetwork.chainId);
                    $('#network-name').text(networkName);
                }
            });

            const network = await provider.getNetwork();
            const networkName = await getNetworkName(network.chainId);
            $('#network-name').text(networkName);
        } else {
            console.log('Please install MetaMask!');
        }
    }
    updateNetworkName();
});

$(async function(){
    console.log(window.ethereum);
    if(typeof window.ethereum == "undefined"){
        alert("請安裝 MetaMask！");
    }else{
        try{
            var accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("accounts", accounts);

            $("#account").val(accounts[0]);
        }catch(e){
            alert(e.message);
        }
    }
})

ethereum.on("accountsChanged", function(accounts){
    console.log("accountsChanged", accounts);
    $("#account").val(accounts[0]);
});


ethereum.on("connect", function(connectInfo){
    console.log("connect", connectInfo);
    let chainID = "(" + connectInfo.chainId + ")";
    $("#chain").val(chainID);
});

ethereum.on("chainChanged", function(chainID){
    console.log("Chain ID", chainID);
    window.location.reload();
});

