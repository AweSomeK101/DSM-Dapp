import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import useWeb3Context from "../context/Web3Context";
import { unlockAccount, getNetId } from "../web3/provider";
import { getUserId, getUserInfo } from "../web3/userApi";
import UserStorage from "../abi/UserStorage.json";
import "../components/styles/Welcome.css";

function Welcome() {
  const [loading, setLoading] = useState(false);
  const { state: {netId, account}, updateAccount, updateNetId, getContractInstance } = useWeb3Context();
  const navigate = useNavigate();

  async function connectHandler(){
    try {
      setLoading(true);

      const data = await unlockAccount();
      updateAccount(data);

      const id = await getNetId(data.web3);
      updateNetId({ netId: id });  

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    if(netId > 0){
      fetchUserId().then((user) => {
        navigate("/", {state: {user}});
      })
      .catch(error => {
        alert(error.message);
        console.error(error);
      })
      setLoading(false);
    }
  }, [netId])

  async function fetchUserId(){
    const storage = getContractInstance(UserStorage);
    const userId = await getUserId(account, storage);
    if(userId === 0) return null;
    const user = await getUserInfo(userId, storage);
    return user;
  }

  return (
    <div className="welcome">
        <div className="welcome-card">
            <div className="welcome-card-text">
                <h2>Welcome to Decentralized Twitter</h2>
                <p>Connect Wallet to continue!</p>
            </div>
            <button disabled={loading} onClick={connectHandler}>{loading? "Connecting..." : "Connect Wallet"}</button>
        </div>
    </div>
  )
}

export default Welcome