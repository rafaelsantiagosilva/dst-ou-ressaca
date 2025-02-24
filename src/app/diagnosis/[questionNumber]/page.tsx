import NotFound from '@/app/not-found';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { questions } from '@/data/questions';
import { Question } from './question';
import { Results } from './results';

interface DiagnosisPageProps {
	params: Promise<{
		questionNumber: string;
	}>;
}

export default async function Diagnosis({ params }: DiagnosisPageProps) {
	const { questionNumber } = await params;

	if (questionNumber === 'results') return <Results />;

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
