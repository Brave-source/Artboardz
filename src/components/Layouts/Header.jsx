import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardanoWallet, useWallet, useAddress, useAssets} from "@meshsdk/react";
import axios from "axios";
import { getUserFailure, getUserStart, getUserSuccess, logUserSuccess } from "@/store/redux-slices/userSlice";
import { Bars3Icon } from "@heroicons/react/24/solid";
import UserBalance from "../User/UserBalance";
import HeaderProfile from "../User/HeaderProfile";
import { LogoSmall } from "./LogoSmall";
import { UIAction } from "../../store/redux-slices/UI-slice";
const API_KEY = 'preprodbR58eCHwRZZyP7egeIGdD0v4YeZXdGP1';
const API_URL = 'https://cardano-preprod.blockfrost.io/api/v0';

const Header = () => {
  
  const dispatch = useDispatch();
  const address = useAddress();
  const assets = useAssets();
  const { connected } = useWallet();
  const user = useSelector((item) => item.user.user);
  const collection = useSelector((item) => item.collection.collections);
  
  const collectionPolicyIds = collection.map((item) => {
    return item.policy
  })
 
  const profile = {stakeAddress: address, name: "", image: "", twitter: "", nationality:""}
  useEffect(() => {
   
    const units = assets?.map((item) => item.unit)
    const setPolicyIds = new Set(assets?.map((item) => item.policyId))
    const policyId = [...setPolicyIds];
    const policyIds  = collectionPolicyIds.filter((item) => policyId.includes(item))

    const inputs = {units, policyIds, id: user._id}
    const setAssets = async() => {
      try {
          const res = await axios.put( assets &&` http://localhost:3001/api/users/${user._id}`, inputs)
      }catch(err){
        console.log(err);
      }
    }
    setAssets();
  },[assets, user])

  useEffect(() => {
   !connected && dispatch(logUserSuccess())
  }, [connected, address])

  useEffect(() => {
    const getAddressInfo = async() => {
      dispatch(getUserStart)
      try {
        const res = await axios.post(connected && "http://localhost:3001/api/users", profile);
        dispatch(getUserSuccess((res.data)))
      }catch(err) {
        dispatch(getUserFailure())
      }
    }
    getAddressInfo()
  },[address, connected])

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
        <CardanoWallet/>
        </div>
       <HeaderProfile /> 
      </div>
    </header>
  );
};
export default Header;