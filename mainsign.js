console.log("First");
console.log("Pass");

const Moralis = require('moralis/node');
const ipc = require('ipc-event-emitter').default(process);
const serverUrl = 'https://yss2n1a1jfia.usemoralis.com:2053/server';
const appId = 'wgXFG92adB9cgJGPModdvDnnfOVJcnmpDCA6wHEo';

Moralis.start({ serverUrl, appId });

// Do stuff after successful login.
console.log("2");

//Listen to 'myevent' event

signup = async (name,email,password) => {
    const user = new Moralis.User();
    console.log(email);
    console.log(name);
    user.set("username", email);
    user.set("email", email);
    user.set("password", password);
    console.log("pass set");
    try{
        await user.signUp();
        console.log("Successfully signUp");
        console.log(user);
        // Hooray! Let them use the app now.
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log("Fail!");
        console.log(user);
    }
}

ipc.on('Login', (vars) => {
    console.log("tewts");
    signup(vars.email,vars.email,vars.password);
    
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




