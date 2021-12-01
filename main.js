require('dotenv').config({ path: 'H:/ue4Project/MyProject4/Content/Scripts/.env' });
const fetch = require('node-fetch');
const Moralis = require('moralis/node');
const ipc = require('ipc-event-emitter').default(process); //ipc-event-emitter use to send and receive data between node.js and unreal engine
const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;
let userAcc = 0;
Moralis.start({ serverUrl, appId });


console.log("Moralis_Start");


getUserId = async() => {
    const query = new Moralis.Query("PolygonBalance");
    console.log("1pass");
    const userId = await query.find();
    console.log(userId);
}

//Function Login to Moralis
Login = async (name,email,password) => {
    
    try{
        await Moralis.User.logIn(email, password).then(function (user) {
            accounts = user.get('accounts');
            userAcc = accounts;
        })
        ipc.emit('SuccessLogin', accounts[0]);//bind function to call event in unreal engine after success
        console.log("Successfully Log in");
        console.log(accounts[0]);
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log("Fail!");
    }
}



Reward = async (name,email,password) => {
    
    try{
        await Moralis.User.logIn(email, password).then(function (user) {
            accounts = user.get('accounts')
        })
        ipc.emit('SuccessLogin', accounts);//bind function to call event in unreal engine after success
        console.log("Successfully Reward");
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log("Reward Fail!");
    }
}
let NFTdata = 0;

getNFTs = async () => {
    const options = { chain: 'mumbai', address: userAcc[0]};
    const nfts = await Moralis.Web3.getNFTs(options);

    nfts.forEach(nft => {
        let url = nft.token_uri;
        
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            ipc.emit('NFTData', data.image);
            ipc.emit('NFTAmount', nft.amount);
        });
        
    })
}




// emit function name "login" to unreal engine (waiting for receive data)
ipc.on('Login', (vars) => {
    console.log("Call Login to Moralis");
    Login(vars.email,vars.email,vars.password);
});

// emit function name "login" to unreal engine (waiting for receive data)
ipc.on('Reward', (vars) => {
    console.log("Get Reward");
});


ipc.on('NFTItemList', (vars) => {
    console.log("GetList");
    getNFTs();
});








