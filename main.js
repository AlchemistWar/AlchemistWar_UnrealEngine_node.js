
const Moralis = require('moralis/node');
const ipc = require('ipc-event-emitter').default(process); //ipc-event-emitter use to send and receive data between node.js and unreal engine
const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;

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
    

    console.log("pass");
    
    try{
        await Moralis.User.logIn(email, password).then(function (user) {
            accounts = user.get('accounts')/* AA */
        })
        ipc.emit('SuccessLogin', accounts);//bind function to call event in unreal engine after success
        console.log("Successfully Log in");
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log("Fail!");
    }
}

// emit function name "login" to unreal engine (waiting for receive data)
ipc.on('Login', (vars) => {
    console.log("Call Login to Moralis");
    Login(vars.email,vars.email,vars.password);
});





