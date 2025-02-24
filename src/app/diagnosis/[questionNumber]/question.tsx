'use client';

import { Button } from '@/components/ui/button';
import { Question as IQuestion } from '@/data/questions';
import { useState } from 'react';
import { redirect } from 'next/navigation';

interface QuestionProps {
	question: IQuestion;
	questionNumber: string;
}

export function Question({ question, questionNumber }: QuestionProps) {
	const questionNumberInt = Number.parseInt(questionNumber);
	if (questionNumberInt === 1) localStorage.setItem('diagnosisPoints', '0');

	const [selectedAnswerValue, setSelectedAnswerValue] = useState<
		string | undefined
	>('');
	const [selectedAnswerKey, setSelectedAnswerKey] = useState('');

	// const dP = localStorage.getItem('diagnosisPoints');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!localStorage.getItem('diagnosisPoints')) redirect('/diagnosis/1');

		const earlierPoints = Number.parseInt(
			localStorage.getItem('diagnosisPoints') as string
		);

		if (selectedAnswerValue === undefined) return;

		localStorage.setItem(
			'diagnosisPoints',
			(earlierPoints + Number.parseInt(selectedAnswerValue)).toString()
		);

		redirect(
			`/diagnosis/${
				questionNumberInt + 1 == 6 ? 'results' : questionNumberInt + 1
			}`
		);
	}

	return (
		<form
			onSubmit={(event) => handleSubmit(event)}
			className="p-4 bg-zinc-50 border shadow-lg rounded-md"
		>
			<h1 className="text-lg font-semibold border-b pb-2">{question.title}</h1>
			{/* <h2>
				Pontos: {dP} | Seleção: {selectedAnswerValue}
			</h2> */}
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
								setSelectedAnswerValue(event.target.value);
								setSelectedAnswerKey(answer.key);
							}}
							checked={selectedAnswerKey === answer.key}
						/>
						<span>{answer.title}</span>
					</label>
				);
			})}
			{selectedAnswerValue ? (
				<Button type="submit" variant={'green'} className="text-md p-4 mt-2 w-full">
					Responder
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
