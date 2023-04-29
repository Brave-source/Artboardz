import React, { useEffect, useRef, useState } from "react";
import CameraIcon from "@/assets/icons/CameraIcon";
import CloseIcon from "@/assets/icons/CloseIcon";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import InputBase from "@mui/material/InputBase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import Image from "next/image";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "@/lib/index";
import validation from "./Validation";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/store/redux-slices/userSlice";
import { useAddress } from "@meshsdk/react";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    color: "White",

    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const ProfileEditForm = ({ onCloseForm, propUser }) => {
  const [file, setFile] = useState(null);

  const [fileUrl, setFileUrl] = useState("");
  const [errors, setErrors] = useState({});

  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const id = propUser?._id;

  const store = useSelector((state) => state);

  useEffect(() => {
    if (store) {
      setIsFetching(store.user.isFetching);
    }
  }, [store]);

  const [nationality, setNationality] = useState(propUser.nationality);
  const [name, setName] = useState(propUser.name);
  const [twitter, setTwitter] = useState(propUser.twitter);
  const address = useAddress();

  const uploadFile = (file, imageUrl) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running" + progress);
            break;
          default:
            break;
        }
      },
      (error) => {
        toast.error("Upload failed! Try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          toast.success("Successsfully uploaded");
        });
      }
    );
  };

  useEffect(() => {
    file && uploadFile(file, "image");
  }, [file]);

  const updateUser = {
    image: fileUrl ? fileUrl : propUser.image,
    name: name ? name : propUser.name,
    nationality: nationality ? nationality : propUser.nationality,
    twitter: twitter ? twitter : propUser.twitter,
    stakeAddress: propUser.stakeAddress ? propUser.stakeAddress : address
  };

  const formSubmitHandler = async (evt) => {
    evt.preventDefault();
    setErrors(validation(updateUser));
    dispatch(updateUserStart());
    console.log(updateUser)
    try {
      const res = await axios.post( propUser._id ? 
        `https://artboardz.net/api/users/${id}` : 
        `https://artboardz.net/api/edit`,
        updateUser
      );
      console.log(res.data);
      dispatch(updateUserSuccess(updateUser));
      toast.success("Successfully updated!");
      onCloseForm();
    } catch (err) {
      console.log(err)
      dispatch(updateUserFailure());
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="bg-[#011740]  px-8 pb-10 pt-5  grid place-items-center gap-y-5 text-white font-Montserrat tracking-wide border-[#B8C0CC] border rounded-md absolute top-0 left-1/2 -translate-x-1/2 max-w-[98%] w-[520px]"
    >
      <button type="button" onClick={onCloseForm} className="w-fit ml-auto">
        <CloseIcon />
      </button>
      <div>
        <label
          htmlFor="image"
          className="rounded-full border border-white w-[190px] h-[190px] flex items-center justify-center"
        >
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              className="rounded-full w-[100%] h-[100%] object-cover"
            />
          ) : (
            <Image
              src={propUser.image}
              width={190}
              height={190}
              alt=""
              className="rounded-full w-190px h-190px  object-cover"
            />
          )}
        </label>
        <input
          type="file"
          name="image"
          id="image"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        {/* {errors.image && <p className="text-red-400">{errors.image}</p>} */}
      </div>
      <div className="flex gap-2 flex-col w-full">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          // name="name"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#011335] border  px-3 border-white rounded h-10 focus:outline-blue-500 "
          maxlength="12"
        />
        {errors.name && <p className="text-red-400">{errors.name}</p>}
      </div>
      <div className="flex gap-2 flex-col w-full">
        <label htmlFor="Nationality">Nationality</label>
        <Box sx={{ minWidth: 120 }}>
          <FormControl variant="standard" fullWidth>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              name="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              input={<BootstrapInput />}
              className="bg-[#011335]"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Afghan">Afghan</MenuItem>
              <MenuItem value="Albanian">Albanian</MenuItem>
              <MenuItem value="Algerian">Algerian</MenuItem>
              <MenuItem value="American">American</MenuItem>
              <MenuItem value="Andorran">Andorran</MenuItem>
              <MenuItem value="Angolan">Angolan</MenuItem>
              <MenuItem value="Antiguans">Antiguans</MenuItem>
              <MenuItem value="Argentinean">Argentinean</MenuItem>
              <MenuItem value="Armenian">Armenian</MenuItem>
              <MenuItem value="Australian">Australian</MenuItem>
              <MenuItem value="Austrian">Austrian</MenuItem>
              <MenuItem value="Azerbaijani">Azerbaijani</MenuItem>
              <MenuItem value="Bahamian">Bahamian</MenuItem>
              <MenuItem value="Bahraini">Bahraini</MenuItem>
              <MenuItem value="Bangladeshi">Bangladeshi</MenuItem>
              <MenuItem value="Barbadian">Barbadian</MenuItem>
              <MenuItem value="Barbudans">Barbudans</MenuItem>
              <MenuItem value="Batswana">Batswana</MenuItem>
              <MenuItem value="Belarusian">Belarusian</MenuItem>
              <MenuItem value="Belgian">Belgian</MenuItem>
              <MenuItem value="Belizean">Belizean</MenuItem>
              <MenuItem value="Beninese">Beninese</MenuItem>
              <MenuItem value="Bhutanese">Bhutanese</MenuItem>
              <MenuItem value="Bolivian">Bolivian</MenuItem>
              <MenuItem value="Bosnian">Bosnian</MenuItem>
              <MenuItem value="Brazilian">Brazilian</MenuItem>
              <MenuItem value="British">British</MenuItem>
              <MenuItem value="Bruneian">Bruneian</MenuItem>
              <MenuItem value="Bulgarian">Bulgarian</MenuItem>
              <MenuItem value="Burkinabe">Burkinabe</MenuItem>
              <MenuItem value="Burmese">Burmese</MenuItem>
              <MenuItem value="Burundian">Burundian</MenuItem>
              <MenuItem value="Cambodian">Cambodian</MenuItem>
              <MenuItem value="Cameroonian">Cameroonian</MenuItem>
              <MenuItem value="Canadian">Canadian</MenuItem>
              <MenuItem value="Cape verdean">Cape Verdean</MenuItem>
              <MenuItem value="Central african">Central African</MenuItem>
              <MenuItem value="Chadian">Chadian</MenuItem>
              <MenuItem value="Chilean">Chilean</MenuItem>
              <MenuItem value="Chinese">Chinese</MenuItem>
              <MenuItem value="Colombian">Colombian</MenuItem>
              <MenuItem value="Comoran">Comoran</MenuItem>
              <MenuItem value="Congolese">Congolese</MenuItem>
              <MenuItem value="Costa rican">Costa Rican</MenuItem>
              <MenuItem value="Croatian">Croatian</MenuItem>
              <MenuItem value="Cuban">Cuban</MenuItem>
              <MenuItem value="Cypriot">Cypriot</MenuItem>
              <MenuItem value="Czech">Czech</MenuItem>
              <MenuItem value="Danish">Danish</MenuItem>
              <MenuItem value="Djibouti">Djibouti</MenuItem>
              <MenuItem value="Dominican">Dominican</MenuItem>
              <MenuItem value="Dutch">Dutch</MenuItem>
              <MenuItem value="East timorese">East Timorese</MenuItem>
              <MenuItem value="Ecuadorean">Ecuadorean</MenuItem>
              <MenuItem value="Egyptian">Egyptian</MenuItem>
              <MenuItem value="Emirian">Emirian</MenuItem>
              <MenuItem value="Equatorial guinean">Equatorial Guinean</MenuItem>
              <MenuItem value="Eritrean">Eritrean</MenuItem>
              <MenuItem value="Estonian">Estonian</MenuItem>
              <MenuItem value="Ethiopian">Ethiopian</MenuItem>
              <MenuItem value="Fijian">Fijian</MenuItem>
              <MenuItem value="Filipino">Filipino</MenuItem>
              <MenuItem value="Finnish">Finnish</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="Gabonese">Gabonese</MenuItem>
              <MenuItem value="Gambian">Gambian</MenuItem>
              <MenuItem value="Georgian">Georgian</MenuItem>
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="Ghanaian">Ghanaian</MenuItem>
              <MenuItem value="Greek">Greek</MenuItem>
              <MenuItem value="Grenadian">Grenadian</MenuItem>
              <MenuItem value="Guatemalan">Guatemalan</MenuItem>
              <MenuItem value="Guinea-bissauan">Guinea-Bissauan</MenuItem>
              <MenuItem value="Guinean">Guinean</MenuItem>
              <MenuItem value="Guyanese">Guyanese</MenuItem>
              <MenuItem value="Haitian">Haitian</MenuItem>
              <MenuItem value="Herzegovinian">Herzegovinian</MenuItem>
              <MenuItem value="Honduran">Honduran</MenuItem>
              <MenuItem value="Hungarian">Hungarian</MenuItem>
              <MenuItem value="Icelander">Icelander</MenuItem>
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="Indonesian">Indonesian</MenuItem>
              <MenuItem value="Iranian">Iranian</MenuItem>
              <MenuItem value="Iraqi">Iraqi</MenuItem>
              <MenuItem value="Irish">Irish</MenuItem>
              <MenuItem value="Israeli">Israeli</MenuItem>
              <MenuItem value="Italian">Italian</MenuItem>
              <MenuItem value="Ivorian">Ivorian</MenuItem>
              <MenuItem value="Jamaican">Jamaican</MenuItem>
              <MenuItem value="Japanese">Japanese</MenuItem>
              <MenuItem value="Jordanian">Jordanian</MenuItem>
              <MenuItem value="Kazakhstani">Kazakhstani</MenuItem>
              <MenuItem value="Kenyan">Kenyan</MenuItem>
              <MenuItem value="Kittian and nevisian">
                Kittian and Nevisian
              </MenuItem>
              <MenuItem value="Kuwaiti">Kuwaiti</MenuItem>
              <MenuItem value="Kyrgyz">Kyrgyz</MenuItem>
              <MenuItem value="Laotian">Laotian</MenuItem>
              <MenuItem value="Latvian">Latvian</MenuItem>
              <MenuItem value="Lebanese">Lebanese</MenuItem>
              <MenuItem value="Liberian">Liberian</MenuItem>
              <MenuItem value="Libyan">Libyan</MenuItem>
              <MenuItem value="Liechtensteiner">Liechtensteiner</MenuItem>
              <MenuItem value="Lithuanian">Lithuanian</MenuItem>
              <MenuItem value="Luxembourger">Luxembourger</MenuItem>
              <MenuItem value="Macedonian">Macedonian</MenuItem>
              <MenuItem value="Malagasy">Malagasy</MenuItem>
              <MenuItem value="Malawian">Malawian</MenuItem>
              <MenuItem value="Malaysian">Malaysian</MenuItem>
              <MenuItem value="Maldivan">Maldivan</MenuItem>
              <MenuItem value="Malian">Malian</MenuItem>
              <MenuItem value="Maltese">Maltese</MenuItem>
              <MenuItem value="Marshallese">Marshallese</MenuItem>
              <MenuItem value="Mauritanian">Mauritanian</MenuItem>
              <MenuItem value="Mauritian">Mauritian</MenuItem>
              <MenuItem value="Mexican">Mexican</MenuItem>
              <MenuItem value="Micronesian">Micronesian</MenuItem>
              <MenuItem value="Moldovan">Moldovan</MenuItem>
              <MenuItem value="Monacan">Monacan</MenuItem>
              <MenuItem value="Mongolian">Mongolian</MenuItem>
              <MenuItem value="Moroccan">Moroccan</MenuItem>
              <MenuItem value="Mosotho">Mosotho</MenuItem>
              <MenuItem value="Motswana">Motswana</MenuItem>
              <MenuItem value="Mozambican">Mozambican</MenuItem>
              <MenuItem value="Namibian">Namibian</MenuItem>
              <MenuItem value="Nauruan">Nauruan</MenuItem>
              <MenuItem value="Nepalese">Nepalese</MenuItem>
              <MenuItem value="New zealander">New Zealander</MenuItem>
              <MenuItem value="Ni-vanuatu">Ni-Vanuatu</MenuItem>
              <MenuItem value="Nicaraguan">Nicaraguan</MenuItem>
              <MenuItem value="Nigerian">Nigerian</MenuItem>
              <MenuItem value="North korean">North Korean</MenuItem>
              <MenuItem value="Northern irish">Northern Irish</MenuItem>
              <MenuItem value="Norwegian">Norwegian</MenuItem>
              <MenuItem value="Omani">Omani</MenuItem>
              <MenuItem value="Pakistani">Pakistani</MenuItem>
              <MenuItem value="Palauan">Palauan</MenuItem>
              <MenuItem value="Panamanian">Panamanian</MenuItem>
              <MenuItem value="Papua new guinean">Papua New Guinean</MenuItem>
              <MenuItem value="Paraguayan">Paraguayan</MenuItem>
              <MenuItem value="Peruvian">Peruvian</MenuItem>
              <MenuItem value="Polish">Polish</MenuItem>
              <MenuItem value="Portuguese">Portuguese</MenuItem>
              <MenuItem value="Qatari">Qatari</MenuItem>
              <MenuItem value="Romanian">Romanian</MenuItem>
              <MenuItem value="Russian">Russian</MenuItem>
              <MenuItem value="Rwandan">Rwandan</MenuItem>
              <MenuItem value="Saint lucian">Saint Lucian</MenuItem>
              <MenuItem value="Salvadoran">Salvadoran</MenuItem>
              <MenuItem value="Samoan">Samoan</MenuItem>
              <MenuItem value="San marinese">San Marinese</MenuItem>
              <MenuItem value="Sao tomean">Sao Tomean</MenuItem>
              <MenuItem value="Saudi">Saudi</MenuItem>
              <MenuItem value="Scottish">Scottish</MenuItem>
              <MenuItem value="Senegalese">Senegalese</MenuItem>
              <MenuItem value="Serbian">Serbian</MenuItem>
              <MenuItem value="Seychellois">Seychellois</MenuItem>
              <MenuItem value="Sierra leonean">Sierra Leonean</MenuItem>
              <MenuItem value="Singaporean">Singaporean</MenuItem>
              <MenuItem value="Slovakian">Slovakian</MenuItem>
              <MenuItem value="Slovenian">Slovenian</MenuItem>
              <MenuItem value="Solomon islander">Solomon Islander</MenuItem>
              <MenuItem value="Somali">Somali</MenuItem>
              <MenuItem value="South african">South African</MenuItem>
              <MenuItem value="South korean">South Korean</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="Sri lankan">Sri Lankan</MenuItem>
              <MenuItem value="Sudanese">Sudanese</MenuItem>
              <MenuItem value="Surinamer">Surinamer</MenuItem>
              <MenuItem value="Swazi">Swazi</MenuItem>
              <MenuItem value="Swedish">Swedish</MenuItem>
              <MenuItem value="Swiss">Swiss</MenuItem>
              <MenuItem value="Syrian">Syrian</MenuItem>
              <MenuItem value="Taiwanese">Taiwanese</MenuItem>
              <MenuItem value="Tajik">Tajik</MenuItem>
              <MenuItem value="Tanzanian">Tanzanian</MenuItem>
              <MenuItem value="Thai">Thai</MenuItem>
              <MenuItem value="Togolese">Togolese</MenuItem>
              <MenuItem value="Tongan">Tongan</MenuItem>
              <MenuItem value="Trinidadian or tobagonian">
                Trinidadian or Tobagonian
              </MenuItem>
              <MenuItem value="Tunisian">Tunisian</MenuItem>
              <MenuItem value="Turkish">Turkish</MenuItem>
              <MenuItem value="Tuvaluan">Tuvaluan</MenuItem>
              <MenuItem value="Ugandan">Ugandan</MenuItem>
              <MenuItem value="Ukrainian">Ukrainian</MenuItem>
              <MenuItem value="Uruguayan">Uruguayan</MenuItem>
              <MenuItem value="Uzbekistani">Uzbekistani</MenuItem>
              <MenuItem value="Venezuelan">Venezuelan</MenuItem>
              <MenuItem value="Vietnamese">Vietnamese</MenuItem>
              <MenuItem value="Welsh">Welsh</MenuItem>
              <MenuItem value="Yemenite">Yemenite</MenuItem>
              <MenuItem value="Zambian">Zambian</MenuItem>
              <MenuItem value="Zimbabwean">Zimbabwean</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* {errors.nationality && <p className="text-red-400">{errors.nationality}</p>} */}
      </div>
      <div className="flex gap-2 flex-col w-full">
        <label htmlFor="Twitter">Twitter</label>
        <input
          type="url"
          name="twitter"
          id="Twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className="bg-[#011335] border  px-3  border-white rounded h-10 focus:outline-blue-500 "
        />
        {/* {errors.twitter && <p className="text-red-400">{errors.twitter}</p>} */}
      </div>
      {/* <FormControlLabel control={<Checkbox defaultChecked /> } label="Receive Rewards" sx={{position: 'relative',right: '30%',}}/> */}
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={onCloseForm}
          className="font-Roboto border border-[#B8C0CC] rounded py-[8px] px-[24px]"
        >
          Cancel
        </button>
        {isFetching ? (
          <button
            type="submit"
            className="font-Roboto bg-purple-400 cursor-not-allowed rounded py-[8px] px-[24px]"
          >
            Updating...
          </button>
        ) : (
          <button className="font-Roboto bg-[#6E028F] rounded py-[8px] px-[24px]">
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileEditForm;
