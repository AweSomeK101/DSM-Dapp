import { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Right from "../components/Right";
import { GlobalContext, Updater } from "../context/Global";
import { Outlet, useLocation } from "react-router-dom";
import useWeb3Context from "../context/Web3Context";
import { getLatestTweetIds, loadTweetsFromTweetPromises } from "../web3/tweetApi";
import TweetStorage from "../abi/TweetStorage.json";
import UserStorage from "../abi/UserStorage.json";

function Twitter() {
    const {addUser, addBulkTweets} = useContext(GlobalContext);
    const {getContractInstance} = useWeb3Context();
    const location = useLocation();

    useEffect(() => {
        (async function fun() {
            console.log("running")
            try {
                const {user} = location.state || null;
                if(user)
                    addUser(user);
                await getTweets();
            } catch (error) {
                alert(error.message)
                console.error(error);
            }
        })()
    }, [])

    async function getTweets(){
        const tweetStorage = getContractInstance(TweetStorage);
        const userStorage = getContractInstance(UserStorage);
        const tweetPromises = await getLatestTweetIds(tweetStorage);
        const tweets = await loadTweetsFromTweetPromises(tweetPromises, userStorage)
        addBulkTweets(tweets);
    }

    return (
        <div className="app">
            <Sidebar />
            <Outlet />
            <Right />
            <Updater />
        </div>    
    )
}

export default Twitter