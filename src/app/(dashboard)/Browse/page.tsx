
import CreateFormButton from "@/components/CreateFormButton";
import CardWrapper from "@/components/CardWrapper";
import Navbar from "@/components/Navbar";
import FormsWrapper from "@/components/FormsWrapper";

const Home = () => {
  return (
    <div className="w-full ">
      <Navbar></Navbar>
      <div className="flex justify-center items-center gap-4">
        <CardWrapper />
      </div>

      <div className="w-full mt-10 px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <FormsWrapper></FormsWrapper>
      </div>
    </div>
  );
};

export default Home;
