import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";
import defaultProfile from "@/assets/images/defaultProfile.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useWallet } from "@meshsdk/react";

const HeaderProfile = () => {
  const [user, setUser] = useState({})
  const store = useSelector(state => state);
  const { connected } = useWallet();

  useEffect(() => {
    if (store) {
      setUser(store.user.user);
    }
  }, [store]);
  return (
    <div className="flex gap-2 items-center">
      {connected && (<>
        <Link
        href="/profile"
        className="block w-[40px] aspect-square border border-[#7EAAFF] rounded-full "
      > 
        <Avatar
          image={user.image ? user.image : defaultProfile}
          username={"profile"}
        />
      </Link>
      <span aria-hidden>
        <ChevronDownIcon className="w-4 text-[#7EAAFF]" />
      </span>
      </>)}
    </div>
  );
};

export default HeaderProfile;
