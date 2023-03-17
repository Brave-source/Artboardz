import MainProfile from "../../User/MainProfile";
import { DUMMY_RELEASES } from "../NewReleaseSections/NewReleaseSection";
import UserArtboardzList from "../../User/UserArtboardzList";
import { useSelector } from "react-redux";

const DUMMY_USER = {
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvFFG-hAuwWCF1wpo8rDXVEfoFI4_MTg0V8Q&usqp=CAU",
  username: "Edmund E. M ",
  location: { city: "Lagos", country: "Nigeria" },
};

const MyProfileSection = () => {
  const user = useSelector((user) => user.user.user);
  const filterCollections = useSelector((item) => item.collection.collections.filter((own) => own.patronId.includes(user._id)));

  return (
    <section className=" text-white font-Montserrat relative">
      <MainProfile
        image={DUMMY_USER.image}
        username={DUMMY_USER.username}
        location={DUMMY_USER.location}
      />
      <div className="p-4">
        <p className="font-Montserrat text-lg font-semibold tracking-wide sm:ml-5 mt-4">
          My Artboardz ({filterCollections.length}){" "}
        </p>
      </div>
      <div className="p-4">
        <UserArtboardzList artBoardz={filterCollections} />
      </div>
    </section>
  );
};

export default MyProfileSection;
