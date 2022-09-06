import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import "./styles/Post.css";

function Post({ displayName, username, text, image, avatar }) {
  return (
    <div className="post">
      <div className="postAvatar">
        <Avatar src={avatar} />
      </div>

      <div className="postBody">
        <div className="postHeader">
          <div className="postHeaderText">
            <Link to={`/profile/${username}`} >
              <h3>
                {displayName}
                <span className="postHeaderSpecial">
                  @{username}
                </span>
              </h3>
            </Link>
          </div>
          <div className="postHeaderDescription">
            <p>{text}</p>
          </div>
        </div>
        <img
          src={image}
          alt=""
        />
        <div className="postFooter">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
