import { useContext, createContext, useState } from "react";

const INITIAL_STATE = {
    account: "",
    web3: null,
    netId: 0
}

const Web3Context = createContext();

export default function useWeb3Context() {
  return useContext(Web3Context);
}

export const Web3Provider = ({children}) => {
    const [state, setState] = useState(INITIAL_STATE);

    function updateAccount(data) {
      const web3 = data.web3 || state.web3;
      setState(prev => ({...prev, web3, account: data.account}));
    }

    function updateNetId(netId) {
      setState(prev => ({...prev, ...netId}));
    }

    function getContractInstance(contract) {
      const contractNetwork = contract.networks[state.netId];
      if(!contractNetwork){
        throw new Error("Contract not found on network");
      }
      const contractInstance = new state.web3.eth.Contract(contract.abi, contractNetwork.address, {from: state.account});
      return contractInstance;  
    }

    return (
        <Web3Context.Provider
          value={{
            state,
            updateAccount,
            updateNetId,
            getContractInstance
          }}
        >
          {children}
        </Web3Context.Provider>
      );
}