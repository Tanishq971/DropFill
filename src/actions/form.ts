"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { formSchema } from "@/lib/schema";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export async function GetFormStats() {
  const session = await getSession();

  console.log("Session in GetFormStats:", session);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const email = session?.user?.email;
  const user = await prisma.user.findUnique({
    where: {
      email: email || "",
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  let submissionRate = 0;
  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    submissions,
    submissionRate,
    bounceRate,
    visits,
  };
}

export async function createForm(data: {
  name: string;
  description: string | undefined;
}) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Form not valid!");
  }

  const session = await getSession();
  const mail = session?.user?.email;

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: mail || "",
    },
  });

  if (!user) {
    throw new Error("User not found ");
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description || "",
    },
  });

  if (!form) {
    throw new Error("form not created");
  }

  return form;
}

export async function getForms() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const mail = session?.user?.email;

  const user = await prisma.user.findUnique({
    where: {
      email: mail || "",
    },
  });

  if (!user) {
    throw new Error("User not found ");
  }

  const forms = prisma.form.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!forms) return [];

  return forms;
}

export async function GetFormById(formId: number) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const mail = session?.user?.email;

  const user = await prisma.user.findUnique({
    where: {
      email: mail || "",
    },
  });

  if (!user) {
    throw new Error("User not found ");
  }

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
      userId: user.id,
    },
  });

  if (!form) {
    throw new Error("form not exist");
  }

  return form;
}

export async function UpdateFormContent(id: number, jsonElements: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const mail = session?.user?.email;

  const user = await prisma.user.findUnique({
    where: {
      email: mail || "",
    },
  });

  if (!user) {
    throw new Error("User not found ");
  }

  const savedForm = await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonElements,
    },
  });

  if (!savedForm) throw new Error("Form not saved ");
}

export async function publishForm(
  id: number,
  jsonElements: string,
  shareUrl: string,
  formColor?: string
) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const mail = session?.user?.email;

  const user = await prisma.user.findUnique({
    where: {
      email: mail || "",
    },
  });

  if (!user) {
    throw new Error("User not found ");
  }

  const publishedForm = await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonElements,
      shareUrl,
      formColor,
    },
  });

  if (!publishedForm) throw new Error("Form not published!");

  return publishedForm;
}

export async function getFormContentById(id: number) {
  return await prisma.form.update({
    select: {
      content: true,
      formColor: true,
    },
    where: {
      id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });
}

export async function submitResponse(formId: number, response: string) {
  const data = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      FormSubmissions: {
        create: {
          content: response,
        },
      },
    },
  });
}
