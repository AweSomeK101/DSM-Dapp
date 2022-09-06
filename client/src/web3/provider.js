import Web3 from "web3";

export async function unlockAccount() {
  const { ethereum } = window;

  if (!ethereum) {
      throw new Error("Web3 not found");
  }

  const web3 = new Web3(ethereum);
  const accounts = await web3.eth.requestAccounts();

  return { web3, account: accounts[0] || "" };  
}

export async function getNetId(web3) {
    const netId = await web3.eth.net.getId();
    return netId;
}