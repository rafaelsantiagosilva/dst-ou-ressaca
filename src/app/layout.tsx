import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'DST ou Ressaca?',
	description: `Bebeu demais ou leitou demais nesse carnaval? Apareceu alguns
   sintomas estranhos como dores de cabeça, coceira ou vontade de realizar uma 
   revolução comunista? Aqui você encontrará o diagnóstico ideal, além de farmácias 
   próximas 💉`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className="bg-slate-100 overflow-x-hidden">{children}</body>
		</html>
	);
}
