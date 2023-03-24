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
import { getNFTsForAddress } from "../blockfrost/Blockfrost";

const Header = () => {
  
  const dispatch = useDispatch();
  const address = useAddress();
  const [image, setImage] = useState("");
  const assets = useAssets();
  const { connected } = useWallet();
  const user = useSelector((item) => item.user.user);
  const collection = useSelector((item) => item.collection.collections);
  
  const collectionPolicyIds = collection.map((item) => {
    return item.policy
  });

//   useEffect(() => {
//     console.log(assets)
//     const getAssetMetadata = async() => {
//         await Promise.all(
//           assets?.map(async(item) => {
//             const block = await getNFTsForAddress(item.unit)
//             return item.unit
//           })
//         )
//         console.log(res);
//     }
//     getAssetMetadata()
//   },[assets])
 
  const profile = {stakeAddress: address, name: "", image: "", twitter: "", nationality:""}
  useEffect(() => {
    
    const setAssets = async() => {
      const block = await getNFTsForAddress("521281957f949d3c0428fe2cb9bbb52e0f06412effbf289cd3c84df9476c6f7269614c6f6467654762616279");
    const units = assets?.map((item) => item.unit)
    console.log(block)
    console.log(assets)
      // console.log(block.onchain_metadata.image.split("/")[2])
    //   setImage(block.onchain_metadata.image);
    const setPolicyIds = new Set(assets?.map((item) => item.policyId))
    const policyId = [...setPolicyIds];
    const policyIds = collectionPolicyIds.filter((item) => policyId.includes(item))

    const inputs = {units, policyIds, id: user._id}
    // console.log(inputs)
      try {
          const res = await axios.put( assets &&` http://3.230.126.26/api/users/${user._id}`, inputs)
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
        const res = await axios.post(connected && "http://3.230.126.26/api/users", profile);
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