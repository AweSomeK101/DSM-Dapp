import Web3 from "web3";
const {utils: {hexToString, fromAscii}} = Web3;

export async function getUserId(account, storage) {
    const userId = await storage.methods.addresses(account).call();
    return parseInt(userId);
}

export async function getUserInfo(userId, storage) {
    const profile = await storage.methods.profiles(userId).call();
    const {id, username, name, bio} = profile;

    if(id === "0"){
        throw new Error("cant find user");
    }

    return {
        id: parseInt(id),
        username: hexToString(username),
        name: hexToString(name),
        bio
    }
}

export async function createUser(params, controller) {
    const username = fromAscii(params.username);
    const name = fromAscii(params.name);
    const result = await controller.methods.createUser(username, name, params.bio).send();
    return result;
}

export async function getUserIdFromUsername(username, storage) {
    const userId = await storage.methods.usernames(fromAscii(username)).call();
    return userId
}