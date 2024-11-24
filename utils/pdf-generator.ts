import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateTicketPDF(
	name: string,
	userId: string,
	course: string,
	qrCodeDataUrl: string
): Promise<Buffer> {
	try {
		// Create a new PDF document
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

		// Embed fonts
		const helveticaBold = await pdfDoc.embedFont(
			StandardFonts.HelveticaBold
		);
		const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

		// Set initial positions
		const pageWidth = page.getWidth();
		const centerX = pageWidth / 2;
		let currentY = 750;

		// Add title
		page.drawText(
			`${process.env.NEXT_PUBLIC_EVENT_NAME || ''} Event Ticket`,
			{
				x:
					centerX -
					helveticaBold.widthOfTextAtSize(
						`${
							process.env.NEXT_PUBLIC_EVENT_NAME || ''
						} Event Ticket`,
						24
					) /
						2,
				y: currentY,
				font: helveticaBold,
				size: 24,
				color: rgb(0, 0, 0),
			}
		);

		// Add QR Code
		const qrImage = qrCodeDataUrl.split(',')[1];
		const qrImageBytes = Buffer.from(qrImage, 'base64');
		const qrImageEmbed = await pdfDoc.embedPng(qrImageBytes);
		const qrDims = qrImageEmbed.scale(0.8);

		currentY -= 250;
		page.drawImage(qrImageEmbed, {
			x: centerX - qrDims.width / 2,
			y: currentY,
			width: qrDims.width,
			height: qrDims.height,
		});

		// Add details
		currentY -= 100;
		const details = [
			['Name:', name],
			['College ID:', userId],
			['Course:', course],
		];

		for (const [label, value] of details) {
			const labelWidth = helveticaBold.widthOfTextAtSize(label, 14);

			page.drawText(label, {
				x: centerX - 100,
				y: currentY,
				font: helveticaBold,
				size: 14,
				color: rgb(0, 0, 0),
			});

			page.drawText(value, {
				x: centerX - 100 + labelWidth + 10,
				y: currentY,
				font: helvetica,
				size: 14,
				color: rgb(0, 0, 0),
			});

			currentY -= 30;
		}

		// Add footer
		currentY -= 30;
		const footerText =
			'Please show this ticket and QR code at the entrance';
		page.drawText(footerText, {
			x: centerX - helvetica.widthOfTextAtSize(footerText, 10) / 2,
			y: currentY,
			font: helvetica,
			size: 10,
			color: rgb(0, 0, 0),
		});

		// Generate PDF buffer
		const pdfBytes = await pdfDoc.save();
		return Buffer.from(pdfBytes);
	} catch (error) {
		console.error('Error generating PDF:', error);
		throw error;
	}
}
