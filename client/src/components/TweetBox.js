import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { GlobalContext } from "../context/Global";
import useWeb3Context from "../context/Web3Context";
import { createTweet } from "../web3/tweetApi";
import TweetController from "../abi/TweetController.json"
import "./styles/TweetBox.css";

function TweetBox() {
  const [tweetMsg, setTweetMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useContext(GlobalContext);
  const { getContractInstance } = useWeb3Context();

  async function sendTweet(e){
    e.preventDefault();
    setLoading(true);
    
    try {
      const controller = getContractInstance(TweetController);
      await createTweet(tweetMsg, controller);
    } catch (error) {
      console.error(error);
      alert("Tweet could not be tweeted");
    }
    
    setTweetMsg("");
    setLoading(false);
  }

  return (
    <div className="tweetbox">
      <form action="">
        <div className="tweetboxInput">
          <Avatar src={`https://api.multiavatar.com/${user.username}.png?apikey=${process.env.REACT_APP_AVATAR_API}`} />
          <input
            type="text"
            placeholder="What's happening?"
            value={tweetMsg}
            onChange={(e) => setTweetMsg(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={loading} onClick={sendTweet} className="tweetboxButton">
          {loading ? "Tweeting..." : "Tweet"}
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
