
console.log("main.js");
console.log("Pass");

require('dotenv').config()
const Moralis = require('moralis/node');
const ipc = require('ipc-event-emitter').default(process);
const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;

Moralis.start({ serverUrl, appId });

// Do stuff after successful login.
console.log("1");

//Listen to 'myevent' event

Login = async (name,email,password) => {
    

    console.log("pass");
    
    try{
        const user = await Moralis.User.logIn(email, password);
        ipc.emit('SuccessLogin', 'Pass');
        console.log("Successfully Log in");
        // Hooray! Let them use the app now.
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log("Fail!");
    }
}

ipc.on('Login', (vars) => {
    console.log("tewts");
    Login(vars.email,vars.email,vars.password);
    
});

const euclidean = (a, b) =>{
	return ((a ** 2) + (b ** 2)) ** 0.5;
}

//Listen to 'myevent' event
ipc.on('myevent', (vars) => {
	let c = euclidean(vars.x, vars.y);
	console.log('Got a request (a^2+b^2)^0.5: ' + c);

	//emit result back as a 'result' event
	ipc.emit('result', c);
});

console.log('started');




