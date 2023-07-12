import { useEffect, useState } from "react";
import EditIcon from "@/assets/icons/EditIcon";
import TwitterIconsOutline from "@/assets/icons/TwitterIconsOutline";
import Avatar from "./Avatar";
import ProfileEditForm from "./ProfileEditForm";
import { useSelector } from "react-redux";
import Link from "next/link";
import AddWallet from "../ConnectWallet/AddWallet";

const MainProfile = ({ image, username, location }) => {
  const [isRecord, setIsRecord] = useState(false);
  const user = useSelector((item) => item.user.user);
  const [editProfileIsShown, setEditProfileIsShown] = useState(false);
  const [AddWalletopen, setAddWallet] =useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleWalletModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleProfileEditFormHandler = () => {
    setEditProfileIsShown((oldState) => !oldState);
  };

  useEffect(() =>{
    if(user.name) {
      setIsRecord(true)
    } else if(user.nationality) {
      setIsRecord(true)
    } else if(user.image) {
      setIsRecord(true)
    } else if(user.twitter) {
      setIsRecord(true)
    }
  },[user]);

  return (
    <div className="bg-primary-color p-4 text-white font-Montserrat flex gap-5 items-center tracking-wide relative">
      <div className="w-[200px] h-[200px] rounded-full relative">
        <Avatar image={user.image? user.image : "https://firebasestorage.googleapis.com/v0/b/cardano-d265c.appspot.com/o/defaultProfile.png?alt=media&token=63108be1-14c5-4f0c-87d5-95453461d972"} username={user.name} width={100} height={100}/>
        {/* <button
          onClick={toggleProfileEditFormHandler}
          className="w-[32px] aspect-square bg-[#0E1528] rounded-full absolute top-2/3 right-0 flex items-center justify-center"
        >
          <EditIcon />
        </button> */}
      </div>
      <div>
      <div className="flex gap-x-4">
      <p className="text-xl font-semibold">{user.name}</p>
      {user?.twitter && (
        <Link href="/">
          <TwitterIconsOutline className="mt-[6px]"/>
        </Link>
      )}
        </div>
        <p className="text-base font-medium">{user.nationality}</p>
        {isRecord ? (
           <button onClick={toggleProfileEditFormHandler} className="bg-active-link rounded-xl p-2 font-semibold w-8/3    block tracking-wide text-base my-2">
           Edit Profile
       </button>
        ): (
          <button onClick={toggleProfileEditFormHandler} className="bg-active-link rounded-xl p-2 font-semibold w-8/3    block tracking-wide text-base my-2">
          Add Profile
      </button>
        )}
      <button
        onClick={toggleWalletModal}
        className="bg-active-link rounded-xl p-2 font-semibold w-8/3 block tracking-wide text-base my-2"
      >
        Wallets
      </button>
      <AddWallet isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          
      </div>
      {editProfileIsShown && (
        <ProfileEditForm onCloseForm={toggleProfileEditFormHandler}  propUser={user}/>
      )}
    </div>
  );
};

export default MainProfile;
