import React from 'react';

export const AnimatedBackground = React.memo(() => (
	<div className="absolute inset-0 w-full h-full bg-white overflow-hidden z-0">
		<div className="absolute -inset-[10px] opacity-50">
			<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
			<div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
			<div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
		</div>
	</div>
));

AnimatedBackground.displayName = 'AnimatedBackground';
