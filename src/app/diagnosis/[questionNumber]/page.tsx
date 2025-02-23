import NotFound from '@/app/not-found';
import { questions } from '@/data/questions';
import { Question } from './question';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

interface DiagnosisPageProps {
	params: Promise<{
		questionNumber: string;
	}>;
}

export default async function Diagnosis({ params }: DiagnosisPageProps) {
	const { questionNumber } = await params;
	const questionNumberInt = Number.parseInt(questionNumber);
	const question = questions[questionNumberInt];

	if (!question) return <NotFound />;

	return (
		<>
			<Header />
			<div className="h-dvh flex items-center justify-center">
				<Question question={question} questionNumber={questionNumber} />
			</div>
			<Footer />
		</>
	);
}
