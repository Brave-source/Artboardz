import { useEffect } from "react";
import Questions from "@/components/faq/CollectorQuestions";
import QuestionTabs from "@/components/faq/FullTabPanel";



const FAQ = () => {
    useEffect(() => {
        document.querySelector("#main-layout").scrollTop = 0;
      }, []);
      return (
        <>
         
          <div className="text-white font-Montserrat h-screen w-fit  mt-auto sm:mb-10 flex items-center flex-col m-auto ">
          <QuestionTabs/>
          </div>
        </>
      )
}

export default FAQ;