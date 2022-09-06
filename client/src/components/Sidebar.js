import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import { GlobalContext } from "../context/Global";
import SidebarOptions from "./SidebarOptions";
import FormModal from "./FormModal";
import { createUser, getUserId, getUserInfo } from "../web3/userApi";
import useWeb3Context from "../context/Web3Context";
import UserController from "../abi/UserController.json";
import UserStorage from "../abi/UserStorage.json";
import "./styles/Sidebar.css";

function Sidebar() {
  const [loading, setLoading] = useState(false);
  const {user, addUser} = useContext(GlobalContext);
  const {getContractInstance, state: {account}} = useWeb3Context();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleCreateUser(params) {
    setLoading(true);
    try {
      setOpen(false);
      const controller = getContractInstance(UserController);
      await createUser(params, controller);
      const newUser = await fetchUser();
      addUser(newUser);
      alert("User created");
    } catch (error) {
      console.error("create user error: ", error)
    }
    setLoading(false);
  }

  async function fetchUser(){
    const storage = getContractInstance(UserStorage);
    const userId = await getUserId(account, storage);
    const user = await getUserInfo(userId, storage);
    return user;
  }

  

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebarTwitterIcon" />

      <Link to="">
        <SidebarOptions active text="Home" Icon={HomeIcon} />
      </Link>

      <Link to={`profile/${user?.username || ""}`} >
        <SidebarOptions text="Profile" Icon={PermIdentityIcon} />
      </Link>

      {!user ? (loading ? <p>The Account is being created ...</p> : <Button onClick={handleOpen} variant="outlined" className="sidebarTweet">Create Account</Button>) : null}
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-user"
        aria-describedby="model to create a user"
      >
        <FormModal handleCreateUser={handleCreateUser} />
      </Modal>

    </div>
  );
}

export default Sidebar;
