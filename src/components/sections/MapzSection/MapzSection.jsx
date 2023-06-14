import * as React from "react";
import Head from "next/head";
import TweetEmbed from "react-tweet-embed";
import { useRouter } from "next/router";

import { useDropzone } from "react-dropzone";

let Globe = () => null;
if (typeof window !== "undefined") {
  import("react-globe.gl").then((module) => {
    Globe = module.default;
  });
}
import { createClient } from "@supabase/supabase-js";
import toast, { Toaster } from "react-hot-toast";

const makeid = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

const supabase = createClient(
  'https://fszktajafrhklwrsougt.supabase.com',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzemt0YWphZnJoa2x3cnNvdWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1NTQwMDIsImV4cCI6MjAwMTEzMDAwMn0.09FXs1RjV4wYMPA2TgA6tiaxxEUKwvuXwBJri2SWZfI'
);

const MapzSection = () => {

  const [imageUrl, setImageUrl] = React.useState("/images/texture.png");
  const globeRef = React.useRef(null);
  
  const arcsData = [1, 2, 3, 4, 5, 6].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [["#000000"][0], ["#000000"][0]],
  }));

 

  return (
    <div className="flex justify-center align-center">
      
                  <Globe
                    //@ts-ignore
                    ref={globeRef}
                    width={680}
                    height={680}
                    backgroundColor={"rgba(0,0,0,0)"}
                    globeImageUrl={imageUrl}
                    arcColor={"color"}
                    arcsData={arcsData}
                    arcDashGap={0.6}
                    arcDashLength={0.3}
                    arcDashAnimateTime={4000 + 500}
                    rendererConfig={{ preserveDrawingBuffer: true }}
                  />
                 
    
    </div>
  );
};

export default MapzSection;
