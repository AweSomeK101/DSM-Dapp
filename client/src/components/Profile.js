import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import useWeb3Context from "../context/Web3Context";
import { getUserIdFromUsername, getUserInfo } from "../web3/userApi";
import UserStorage from "../abi/UserStorage.json";
import TweetStorage from "../abi/TweetStorage.json";
import { getTweetFromUser, getTweetInfo } from "../web3/tweetApi";
import Post from "./Post";
import "./styles/Profile.css"

function Profile() {
  const [user, setUser] = useState(null);
  const [tweetList, setTweetList] = useState([]);
  const {username} = useParams();
  const { getContractInstance } = useWeb3Context();

  useEffect(() => {
    if(username){
      fetchUser()
      .then(newUser => {
        setUser(newUser);
        fetchUserTweets(newUser.id);
      })
      .catch(err => {
        console.error(err);
      })
    }
  }, [])

  async function fetchUser(){
    const storage = getContractInstance(UserStorage);    
    const userId = await getUserIdFromUsername(username, storage);
    const newUser = await getUserInfo(userId, storage);
    return newUser;
  }

  async function fetchUserTweets(userId){
    const storage = getContractInstance(TweetStorage);
    const tweetIds = await getTweetFromUser(userId, storage);
    
    const tweetPromises = tweetIds.map(tweetId => {
      return getTweetInfo(tweetId, storage);
    })
    const tweets = await Promise.all(tweetPromises);
    setTweetList(tweets);
  }

  return (
    <div className="feed">
      <div className="feedHeader">
        <h2>User Profile</h2>
      </div>

      {user ? 
        <div className="profile">
          <div className="avatarContainer">
          <Avatar 
            src={`https://api.multiavatar.com/${username}.png?apikey=${process.env.REACT_APP_AVATAR_API}`}
            sx={{ width: "30%", height: "auto", maxWidth: 170 }}
          />
          </div>
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <br/>
          <p>{user.bio}</p>
        </div> :
        null
      }

      {tweetList.map((tweet) => <Post
        displayName={user.name}
        username={user.username}
        text={tweet.text}
        avatar={`https://api.multiavatar.com/${username}.png?apikey=${process.env.REACT_APP_AVATAR_API}`}
        key={tweet.id}
      />)}

    </div>
  )
}

export default Profile