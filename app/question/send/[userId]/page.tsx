import { SendQuestionPageWrapper } from './_component/SendQuestionPageWrapper';

export default async function SendQuestionPage({
  params,
}: PageProps<'/question/send/[userId]'>) {
  const { userId } = await params;

  return <SendQuestionPageWrapper userId={userId} />;
}
