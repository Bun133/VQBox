import { QuestionDetailModalInterceptWrapper } from './_component/QuestionDetailModalInterceptWrapper';

export default async function QuestionDetailModalIntercept({
  params,
}: PageProps<'/authed/question/[id]'>) {
  const { id } = await params;

  return <QuestionDetailModalInterceptWrapper id={id} />;
}
