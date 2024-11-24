import React from 'react';
import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from '@react-email/components';

interface EmailTemplateProps {
	name: string;
	course: string;
	email: string;
	mobile: string;
	qrCodeDataUrl: string;
}
export const EmailTemplate: React.FC<EmailTemplateProps> = ({
	name,
	course,
	email,
	mobile,
	qrCodeDataUrl,
}) => (
	<Html>
		<Head />
		<Preview>
			Your {process.env.NEXT_PUBLIC_EVENT_NAME || ''} Event Registration
			has been approved!
		</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={logoContainer}>
					<Img
						src={`https://${process.env.NEXT_PUBLIC_DOMAIN}/logo.png`}
						width="150"
						height="50"
						alt={`${process.env.NEXT_PUBLIC_EVENT_NAME} Logo`}
					/>
				</Section>
				<Section style={headerSection}>
					<Heading style={h1}>Registration Approved!</Heading>
				</Section>
				<Section style={contentSection}>
					<Text style={text}>Dear {name},</Text>
					<Text style={text}>
						Your registration for the{' '}
						{process.env.NEXT_PUBLIC_EVENT_NAME || ''} Event has
						been approved. We&apos;re excited to have you join us!
					</Text>
					<Section style={detailsSection}>
						<Heading as="h2" style={h2}>
							Registration Details:
						</Heading>
						<Row style={{ marginBottom: '10px' }}>
							<Column style={labelColumn}>
								<Text style={labelText}>Name:</Text>
							</Column>
							<Column style={valueColumn}>
								<Text style={valueText}>{name}</Text>
							</Column>
						</Row>
						<Row style={{ marginBottom: '10px' }}>
							<Column style={labelColumn}>
								<Text style={labelText}>Course:</Text>
							</Column>
							<Column style={valueColumn}>
								<Text style={valueText}>{course}</Text>
							</Column>
						</Row>
						<Row style={{ marginBottom: '10px' }}>
							<Column style={labelColumn}>
								<Text style={labelText}>Email:</Text>
							</Column>
							<Column style={valueColumn}>
								<Text style={valueText}>{email}</Text>
							</Column>
						</Row>
						<Row>
							<Column style={labelColumn}>
								<Text style={labelText}>Mobile:</Text>
							</Column>
							<Column style={valueColumn}>
								<Text style={valueText}>{mobile}</Text>
							</Column>
						</Row>
						<Section style={qrCodeSection}>
							<Heading as="h3" style={h3}>
								Your Entry QR Code:
							</Heading>
							<Img
								src={qrCodeDataUrl}
								width="200"
								height="200"
								alt="Entry QR Code"
								style={qrCodeStyle}
							/>
							<Text style={qrCodeText}>
								Please show this QR code at the entrance
							</Text>
						</Section>
					</Section>
					<Text style={text}>
						Please keep this email as confirmation of your
						registration. If you have any questions, feel free to
						contact us.
					</Text>
					<Section style={ctaSection}>
						<Link
							style={ctaButton}
							href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/details`}
						>
							View Event Details
						</Link>
					</Section>
				</Section>
				<Hr style={hr} />
				<Section style={footerSection}>
					<Text style={footerText}>
						Best regards,
						<br />
						{process.env.NEXT_PUBLIC_EVENT_NAME || ''} Team
					</Text>
					<Text style={footerLinks}>
						<Link
							href={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
						>
							Registration Website
						</Link>{' '}
						|{' '}
						<Link
							href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/contact`}
						>
							Contact Us
						</Link>{' '}
						|{' '}
						<Link
							href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/privacy`}
						>
							Privacy Policy
						</Link>
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

export default EmailTemplate;

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
	borderRadius: '5px',
	boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const logoContainer = {
	textAlign: 'center' as const,
	padding: '20px',
};

const headerSection = {
	backgroundColor: '#4F46E5',
	padding: '30px 0',
	borderTopLeftRadius: '5px',
	borderTopRightRadius: '5px',
};

const h1 = {
	color: '#ffffff',
	fontSize: '28px',
	fontWeight: 'bold',
	margin: '0',
	padding: '0',
	textAlign: 'center' as const,
};

const contentSection = {
	padding: '30px',
};

const h2 = {
	color: '#4F46E5',
	fontSize: '20px',
	fontWeight: 'bold',
	margin: '0 0 15px',
	padding: '0',
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

const labelColumn = {
	width: '30%',
};

const valueColumn = {
	width: '70%',
};

const labelText = {
	...text,
	fontWeight: 'bold',
	margin: '0',
};

const valueText = {
	...text,
	margin: '0',
};

const ctaSection = {
	textAlign: 'center' as const,
	margin: '30px 0',
};

const ctaButton = {
	backgroundColor: '#4F46E5',
	borderRadius: '5px',
	color: '#ffffff',
	fontSize: '16px',
	fontWeight: 'bold',
	textDecoration: 'none',
	textAlign: 'center' as const,
	padding: '12px 20px',
	display: 'inline-block',
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
	...text,
	fontSize: '14px',
	color: '#8898aa',
};

const footerLinks = {
	...text,
	fontSize: '14px',
	color: '#8898aa',
};

const qrCodeSection = {
	textAlign: 'center' as const,
	marginTop: '20px',
	padding: '20px',
	backgroundColor: '#ffffff',
	borderRadius: '4px',
};

const h3 = {
	...h2,
	fontSize: '18px',
	marginBottom: '15px',
};

const qrCodeStyle = {
	margin: '0 auto',
	display: 'block',
	border: '1px solid #e6ebf1',
	padding: '10px',
	backgroundColor: '#ffffff',
};

const qrCodeText = {
	...text,
	fontSize: '14px',
	marginTop: '10px',
	color: '#666666',
};
