import { getCurrentUser } from "@/app/libs/actions/actions";

const CurrentUser = async () => {
  console.log("current user rendered");
  const user = await getCurrentUser();
  return <div>{user?.name}</div>;
};

export default CurrentUser;
