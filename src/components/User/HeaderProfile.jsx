import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";
import defaultProfile from "@/assets/images/defaultProfile.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNetwork, useWallet } from "@meshsdk/react";

const HeaderProfile = () => {
  const [user, setUser] = useState({})
  const [isMainnet, setIsMainnet] = useState(false);
  const store = useSelector(state => state);
  const { connected } = useWallet();
  const network = useNetwork();

  useEffect(() => {
    if (store) {
      setUser(store.user.user);
    }
  }, [store]);

  useEffect(() => {
    if(!connected || network == 0) {
      setIsMainnet(false);
    }
  },[connected, network])

  useEffect(() => {
    if(connected && network == 1) {
      setIsMainnet(true);
    }
  },[connected, network]);

  return (
    <div className="flex gap-2 items-center">
      {isMainnet && (<>
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
