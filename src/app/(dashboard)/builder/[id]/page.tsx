import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import type { NextPage } from "next";

type Props = {
  params:any
  searchParams:any
};

const BuilderPage: NextPage<Props> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
    return null;
  }

  const { id } = await params;
  const form = await GetFormById(Number(id));

  if (!form) return <div>Form not made</div>;

  return <FormBuilder form={form} />;
};

export default BuilderPage;