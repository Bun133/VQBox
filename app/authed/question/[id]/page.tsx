import { QuestionDetailPageWrapper } from './_component/QuestionDetailPageWrapper';

export default async function QuestionDetailPage({
  params,
}: PageProps<'/authed/question/[id]'>) {
  const { id } = await params;

  return <QuestionDetailPageWrapper id={id} />;
}
