'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function OnLoadConfetti() {
	useEffect(() => {
		// Confete ao carregar a página
		confetti({
			particleCount: 200,
			spread: 100,
			origin: { y: 0.6 },
		});
	}, []);

	return <div></div>;
}
