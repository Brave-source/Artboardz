import MainProfile from "../../User/MainProfile";
import { DUMMY_RELEASES } from "../NewReleaseSections/NewReleaseSection";
import UserArtboardzList from "../../User/UserArtboardzList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getUserFailure, getUserStart, getUserSuccess } from "@/store/redux-slices/userSlice";
import { useAddress, useWallet } from "@meshsdk/react";

const DUMMY_USER = {
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU",
  username: "Edmund E. M ",
  location: { city: "Lagos", country: "Nigeria" },
};

const MyProfileSection = () => {
  const address = useAddress();
  const { connect } = useWallet();
  const dispatch = useDispatch();
  const user = useSelector((user) => user.user.user);
  const policyIds = useSelector((user) => user.user.user.policyIds);
  const filterAssets = useSelector((item) => item.user.user.assets?.filter((item) => policyIds.includes(item.policyId)));
console.log(user)
console.log(address)
  useEffect(() => {
  const getUser = async() => {
    dispatch(getUserStart())
    try {
      console.log("profile routes")
      const res = await axios.post( !user && `https://artboardz.net/api/users`, {stakeAddress: address});
      dispatch(getUserSuccess(res.data))
    }catch(err) {
      dispatch(getUserFailure())
    }
  }
  getUser();
},[])
  return (
    <section className=" text-white font-Montserrat relative">
      <MainProfile
        image={DUMMY_USER.image}
        username={DUMMY_USER.username}
        location={DUMMY_USER.location}
      />
      <div className="p-4">
        <p className="font-Montserrat text-lg font-semibold tracking-wide sm:ml-5 mt-4">
          My Artboardz ({filterAssets?.length}){" "}
        </p>
      </div>
      <div className="p-4">
        <UserArtboardzList assets={filterAssets} />
      </div>
    </section>
  );
};

export default MyProfileSection;
