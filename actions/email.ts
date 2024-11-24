'use server';

import { Resend } from 'resend';
import { generateQRCode } from '@/utils/qr-generator';
import { generateTicketPDF } from '@/utils/pdf-generator';
import ApprovalEmailTemplate from '@/components/approval-email-template';
import RejectionEmailTemplate from '@/components/rejection-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(
	name: string,
	email: string,
	userId: string,
	course: string,
	mobile: string,
	registrationId: string
) {
	try {
		const qrText = `${registrationId}:${name}`;
		const qrCodeDataUrl = await generateQRCode(qrText);

		// Generate PDF ticket
		const pdfBuffer = await generateTicketPDF(
			name,
			userId,
			course,
			qrCodeDataUrl
		);

		const data = await resend.emails.send({
			from: `${process.env.NEXT_PUBLIC_EVENT_NAME} - Agamya Ticketing Platform <admin@ticketing.agamya.dev>`,
			to: [email],
			subject: `${process.env.NEXT_PUBLIC_EVENT_NAME} Registration Approved, Download your ticket now!`,
			react: ApprovalEmailTemplate({
				name,
				course,
				mobile,
				email,
				qrCodeDataUrl,
			}),
			attachments: [
				{
					filename: `TICKET-${name.split(' ').join('_')}-${userId}-${
						process.env.NEXT_PUBLIC_EVENT_NAME
					}.pdf`,
					content: pdfBuffer,
				},
			],
		});
		console.log('Email sent successfully');

		return { success: true, data };
	} catch (error) {
		console.error('Failed to send email:', error);
		return { success: false, error };
	}
}

export async function sendRejectionEmail(
	name: string,
	email: string,
	course: string
) {
	try {
		const data = await resend.emails.send({
			from: `${process.env.NEXT_PUBLIC_EVENT_NAME} - Agamya Ticketing Platform <admin@ticketing.agamya.dev>`,
			to: [email],
			subject: `${process.env.NEXT_PUBLIC_EVENT_NAME} Registration Status Update`,
			react: RejectionEmailTemplate({
				name,
				course,
			}),
		});
		console.log('Rejection email sent successfully');

		return { success: true, data };
	} catch (error) {
		console.error('Failed to send rejection email:', error);
		return { success: false, error };
	}
}
