import React from 'react';
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from '@react-email/components';

interface RejectionEmailTemplateProps {
	name: string;
	course: string;
}

export const RejectionEmailTemplate: React.FC<RejectionEmailTemplateProps> = ({
	name,
	course,
}) => (
	<Html>
		<Head />
		<Preview>
			Your {process.env.NEXT_PUBLIC_EVENT_NAME || ''} Event Registration
			Status
		</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={headerSection}>
					<Heading style={h1}>Registration Update</Heading>
				</Section>
				<Section style={contentSection}>
					<Text style={text}>Dear {name},</Text>
					<Text style={text}>
						We regret to inform you that your registration for the{' '}
						{process.env.NEXT_PUBLIC_EVENT_NAME} Event has been
						disapproved.
					</Text>
					<Section style={detailsSection}>
						<Text style={text}>Registration Details:</Text>
						<Text style={text}>Name: {name}</Text>
						<Text style={text}>Course: {course}</Text>
					</Section>
					<Text style={text}>
						If you believe this is an error or have any questions,
						please contact our support team.
					</Text>
				</Section>
				<Hr style={hr} />
				<Section style={footerSection}>
					<Text style={footerText}>
						Best regards,
						<br />
						{process.env.NEXT_PUBLIC_EVENT_NAME} Team
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	padding: '20px 0 48px',
	marginBottom: '64px',
	maxWidth: '600px',
};

const headerSection = {
	backgroundColor: '#dc2626',
	padding: '30px 0',
};

const h1 = {
	color: '#ffffff',
	fontSize: '28px',
	fontWeight: 'bold',
	textAlign: 'center' as const,
	margin: '0',
};

const contentSection = {
	padding: '30px',
};

const text = {
	color: '#333',
	fontSize: '16px',
	lineHeight: '26px',
};

const detailsSection = {
	backgroundColor: '#f4f4f4',
	borderRadius: '4px',
	padding: '20px',
	margin: '20px 0',
};

const hr = {
	borderColor: '#e6ebf1',
	margin: '20px 0',
};

const footerSection = {
	textAlign: 'center' as const,
	padding: '0 30px',
};

const footerText = {
	color: '#8898aa',
	fontSize: '14px',
	lineHeight: '24px',
};

export default RejectionEmailTemplate;
