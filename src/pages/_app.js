import "../styles/globals.css";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { store, persistor } from "../store/redux-store";
import { PersistGate } from 'redux-persist/integration/react'
import { createWrapper } from 'next-redux-wrapper';
import {Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MeshProvider } from "@meshsdk/react";
import Header from "@/components/Layouts//Header";
import { navbarState } from "../store/redux-slices/UI-slice";
import Navbar from "@/components/Navigation/Navbar";
import useWindowSize from "@/hook/window-size";
import partner1 from '@/assets/images/partner1.png'
import partner2 from '@/assets/images/partner2.png'
import partner3 from '@/assets/images/partner3.png'
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCollectionFailure, getCollectionStart, getCollectionSuccess } from "@/store/redux-slices/ArtBoardSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectorFailure, getCollectorStart, getCollectorSuccess } from "@/store/redux-slices/CollectorSlice";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch()
  React.useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  const navBarState = useSelector(navbarState);
  const size = useWindowSize();
  const isNavShown = size.width > 1280 ? true : navBarState;
  const router = useRouter();

  useEffect(()=> {
    const getCollections =async() => {
      dispatch(getCollectionStart())
      try {
        const res = await axios.get('http://3.230.126.26/api/collections');
        dispatch(getCollectionSuccess(res.data))
      }catch(err) {
        dispatch(getCollectionFailure())
      }
    }
    getCollections()
  },[])

  useEffect(()=> {
    const getCollections =async() => {
      dispatch(getCollectorStart())
      try {
        const res = await axios.get('http://3.230.126.26/api/users');
        dispatch(getCollectorSuccess(res.data))
      }catch(err) {
        dispatch(getCollectorFailure())
      }
    }
    getCollections()
  },[])

  const paths = ["/","/new-releases", "/faq"];
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MeshProvider>
        {loading ? 
        <LoadingScreen />
        :
        <div>
          <div className={`h-screen layout scrollbar-hide max-w-8xl mx-auto relative`}>
            <Header />
            {isNavShown && <Navbar />}
            <main
              id="main-layout"
              className={` bg-primary-purple main overflow-y-auto bg-transparent flex flex-col scroll-smooth`}
            >
              {!paths.includes(router.pathname) ? <div className={`backdrop w-full h-full absolute top-0 left-1/2 -translate-x-1/2`}  /> :<div></div>
                }
              <Component {...pageProps} />
              <ToastContainer />
              <div className="h-screen w-fit mx-auto mt-auto mb-10 flex items-center flex-col lg:hidden ">
              <h1 className="p-2 text-white text-md font-semibold block">Partners</h1>
              <div className="flex gap-2">
            <Link  href="https://monetsociety.io">
              <Image src={partner1} width={54} />
            </Link >
            <Link href="https://theartbank.io">
            <Image src={partner2} width={54} />
            </Link>
            <Link  href="https://cur8.io">
            <Image src={partner3} width={54} />
            </Link>
            </div>
                {/* <div>
                  <p className="text-white font-Montserrat">Pool ID: d19db...44</p>
                </div> */}
              </div>
            </main>
          </div>
        </div>
    }
        </MeshProvider>
      </PersistGate>
   </Provider>
    
     
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);