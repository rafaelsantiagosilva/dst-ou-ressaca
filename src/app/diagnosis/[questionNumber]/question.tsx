'use client';

import { Button } from '@/components/ui/button';
import { Question as IQuestion } from '@/data/questions';
import { useState } from 'react';
import Link from 'next/link';

interface QuestionProps {
	question: IQuestion;
	questionNumber: string;
}

export function Question({ question, questionNumber }: QuestionProps) {
	const questionNumberInt = Number.parseInt(questionNumber);
	if (questionNumberInt === 1) localStorage.setItem('diagnosisPoints', '0');

	const [selectedAnswerValue, setSelectedAnswerValue] = useState<
		number | undefined
	>(undefined);
	const [selectedAnswerKey, setSelectedAnswerKey] = useState('');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		window.alert(selectedAnswerValue);

		if (!localStorage.getItem('diagnosisPoints')) return;

		const earlierPoints =
			localStorage.getItem('diagnosisPoints') !== null
				? Number.parseInt(localStorage.getItem('diagnosisPoints') ?? '')
				: 0;

		localStorage.setItem('diagnosisPoints', (earlierPoints + 1).toString());
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 bg-zinc-50 border shadow-lg rounded-md"
		>
			<h1 className="text-lg font-semibold border-b pb-2">{question.title}</h1>
			{question.answers.map((answer) => {
				return (
					<label
						htmlFor={`answer-${answer.key}`}
						className="mt-2 border-4 border-r-8 border-b-8 p-2 rounded-lg flex items-center gap-2 cursor-pointer"
						key={answer.key}
					>
						<input
							id={`answer-${answer.key}`}
							type="radio"
							name="answer"
							value={answer.value}
							onChange={(event) => {
								setSelectedAnswerValue(Number.parseInt(event.target.value));
								setSelectedAnswerKey(answer.key);
							}}
							checked={selectedAnswerKey === answer.key}
						/>
						<span>{answer.title}</span>
					</label>
				);
			})}
			{selectedAnswerValue ? (
				<Button
					type="submit"
					variant={'green'}
					className="text-md p-4 mt-2 w-full"
					asChild
				>
					<Link href={`/diagnosis/${questionNumberInt + 1}`}>Responder</Link>
				</Button>
			) : (
				<Button
					type="submit"
					variant={'green'}
					className="text-md p-4 mt-2 w-full"
					disabled
				>
					Responder
				</Button>
			)}
		</form>
	);
}
