import { GetFormStats } from "@/actions/form";
import { signIn, signOut } from "next-auth/react";
import { LuView } from "react-icons/lu";
import CreateFormButton from "@/components/CreateFormButton";
import CardWrapper from "@/components/CardWrapper";
import FormsWrapper from "@/components/FormsWrapper";

const Home = async () => {
  return (
    <div className="container pt-4">
      <div className="flex justify-center gap-4">
        <CardWrapper />
      </div>

      <div>
        <CreateFormButton />
      </div>
      <FormsWrapper></FormsWrapper>
    </div>
  );
};

export default Home;


