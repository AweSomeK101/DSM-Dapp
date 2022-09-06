import { createContext, useReducer, useEffect, useContext } from "react";
import Reducer from "./Reducer";
import useWeb3Context from "./Web3Context";
import TweetStorage from "../abi/TweetStorage.json";
import UserStorage from "../abi/UserStorage.json";
import { getUserInfo } from "../web3/userApi";

const initialState = {
  tweetList: [],
  user: null,
  page: 1
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  function addTweet(data) {
    dispatch({
      type: "ADD_TWEET",
      payload: data,
    });
  }

  function addUser(data) {
    dispatch({
      type: "ADD_USER",
      payload: data,
    });
  }

  function addBulkTweets(data){
    dispatch({
      type: "ADD_BULK_TWEETS",
      payload: data
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        tweetList: state.tweetList,
        user: state.user,
        page: state.page,
        addTweet,
        addUser,
        addBulkTweets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function Updater(){
  const {state: {web3, address}, getContractInstance} = useWeb3Context();
  const {addTweet} = useContext(GlobalContext);

  useEffect(() => {
    const tweetStorage = getContractInstance(TweetStorage);
    const userStorage = getContractInstance(UserStorage);
    const evnt = tweetStorage.events.NewTweet({}, async(err, event) => {
      try {
        if(err) throw err;
        const {id, text, userId, postedAt} = event.returnValues;
        const tweet = {id, text, userId, postedAt}
        const user = await getUserInfo(userId, userStorage);
        addTweet({tweet, user});
      } catch (error) {
        console.error(error)
      }
    })

    return evnt.unsubscribe();
  }, [web3, address])

  return null;
}
