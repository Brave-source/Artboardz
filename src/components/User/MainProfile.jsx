import { useState } from "react";
import EditIcon from "@/assets/icons/EditIcon";
import TwitterIconsOutline from "@/assets/icons/TwitterIconsOutline";
import Avatar from "./Avatar";
import ProfileEditForm from "./ProfileEditForm";
import { useSelector } from "react-redux";
import Link from "next/link";

const MainProfile = ({ image, username, location }) => {
  const user = useSelector((item) => item.user.user);
  const [editProfileIsShown, setEditProfileIsShown] = useState(false);

  const toggleProfileEditFormHandler = () => {
    setEditProfileIsShown((oldState) => !oldState);
  };

  return (
    <div className="bg-primary-color p-4 text-white font-Montserrat flex gap-5 items-center tracking-wide relative">
      <div className="w-[200px] h-[200px] rounded-full relative">
        <Avatar image={user.image} username={user.name} />
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
        <Link href="/">
          <TwitterIconsOutline className="mt-[6px]"/>
        </Link>
        </div>
        <p className="text-base font-medium">{user.nationality}</p>
        <button onClick={toggleProfileEditFormHandler} className="bg-active-link rounded-xl p-2 font-semibold w-5/6    block tracking-wide text-base my-2">
            Edit
          </button>
      </div>
      
      
      {editProfileIsShown && (
        <ProfileEditForm onCloseForm={toggleProfileEditFormHandler} />
      )}
    </div>
  );
};

export default MainProfile;
