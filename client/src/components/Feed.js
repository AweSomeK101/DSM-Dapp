import { useContext } from "react";
import { GlobalContext } from "../context/Global"; 
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./styles/Feed.css";

function Feed() {
  const { tweetList, user } = useContext(GlobalContext);

  var tweets = tweetList.map((tweet) => <Post
    displayName={tweet.user.name}
    username={tweet.user.username}
    text={tweet.tweet.text}
    avatar={`https://api.multiavatar.com/${tweet.user.username}.png?apikey=${process.env.REACT_APP_AVATAR_API}`}
    image={tweet.image || ""}
    key={tweet.tweet.id}
  />
   );

  return (
    <div className="feed">
      <div className="feedHeader">
        <h2>Home</h2>
      </div>

      {user ? <TweetBox /> : null}
      

      {tweets}
     
    </div>
  );
}

export default Feed;
