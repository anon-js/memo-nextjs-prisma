import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileSettingForm from "@/components/ProfileSettingForm";

export default async function ProfileSettingPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
  });

  return (
    <div className="p-8 h-full bg-white overflow-y-auto">
      <ProfileSettingForm user={user} />
    </div>
  );
}