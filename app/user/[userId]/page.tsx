import { UserPageWrapper } from './_component/UserPageWrapper';

export default async function UserPage({
  params,
}: PageProps<'/user/[userId]'>) {
  const { userId } = await params;

  return <UserPageWrapper userId={userId} />;
}
