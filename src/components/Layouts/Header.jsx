import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardanoWallet,
  useWallet,
  useAddress,
  useAssets,
  useNetwork,
} from "@meshsdk/react";
import axios from "axios";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  logUserSuccess,
  updateUserSuccess,
} from "@/store/redux-slices/userSlice";
import { Bars3Icon } from "@heroicons/react/24/solid";
import HeaderProfile from "../User/HeaderProfile";
import { LogoSmall } from "./LogoSmall";
import { UIAction } from "../../store/redux-slices/UI-slice";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import { offSetMainnet, setMainnet } from "@/store/redux-slices/CollectorSlice";

const Header = () => {
  const dispatch = useDispatch();
  const address = useAddress();
  const [image, setImage] = useState("");
  const [isUser, setIsUser] = useState(false);
  const network = useNetwork();
  const assets = useAssets();
  const { connected } = useWallet();
  const user = useSelector((item) => item.user.user);
  const id = user._id;
  const collection = useSelector((item) => item.collection.collections);
  const  isMainnet = useSelector((item) => item.collector.isMainnet);
  const collectionPolicyIds = collection.map((item) => {
    return item.policy;
  });
  const collectionIds = collection.map((item) => {
    return item._id;
  })

  const profile = {
    stakeAddress: address,
    name: "",
    image: "",
    twitter: "",
    nationality: "",
  };

  useEffect(() => {
    const setAssets = async () => {
      const units = assets?.map((item) => item.unit);
      const setPolicyIds = new Set(assets?.map((item) => item.policyId));
      const policyId = [...setPolicyIds];
      const policyIds = new Set(
        collectionPolicyIds.filter((item) => policyId.includes(item))
      );
      const policyids = [...policyIds];

      const inputs = { units, policyIds: policyids, id: user._id, collectionIds };
      try {
        const res = await axios.put(
          isUser && `https://artboardz.net/api/users/${user._id}`,
          inputs
        );
        dispatch(updateUserSuccess(res.data));
      } catch (err) {
      }
    };
    setAssets();
  }, [assets, isUser]);

  useEffect(() => {
    const getAddressInfo = async () => {
      dispatch(getUserStart());
      try {
        const res = await axios.post(
          isMainnet && "https://artboardz.net/api/users",
          profile
        );
        console.log("called")
        dispatch(getUserSuccess(res.data));
      } catch (err) {
        dispatch(getUserFailure());
      }
    };
    getAddressInfo();
  }, [address,isMainnet]);
  
  useEffect(() => {
    if(user.stakeAddress && assets) {
      setIsUser(true)
    }
  }, [assets, user])

  useEffect(() => {
    !connected && dispatch(logUserSuccess());
  }, [connected, address]);

  useEffect(() => {
    if(connected && network == 1) {
      dispatch(setMainnet());
    }
  },[connected, network]);

  useEffect(() => {
    if(!connected || network == 0) {
      dispatch(offSetMainnet());
    }
  },[connected, network]);

  const navbarToggleHandler = () => {
    dispatch(UIAction.toggleNavbar());
  };
  return (
    <header
      className={`bg-primary-color h-{76px} w-full header flex gap-2 px-4 items-center justify-between`}
    >
      <div className="flex gap-4 xl:hidden">
        <button onClick={navbarToggleHandler}>
          <Bars3Icon className="w-8 text-white" />
        </button>
        <LogoSmall />
      </div>
      <div className="flex z-40 text-[#FFFFFF] items-center gap-2 ml-auto">
        <div className="flex lg:flex">
          {/* <CardanoWallet/> */}
          <ConnectWallet />
        </div>
        <HeaderProfile />
      </div>
    </header>
  );
};
export default Header;
