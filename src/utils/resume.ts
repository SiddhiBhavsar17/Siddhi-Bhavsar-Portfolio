import { personalData } from '../data/personalData';

/**
 * Downloads the official resume PDF securely and reliably.
 * Fetches the binary file, validates that it is a valid PDF (not HTML fallback),
 * and triggers a native browser download using an application/pdf Blob.
 */
export async function downloadResumeFile(customFilename?: string): Promise<boolean> {
  const fileUrl = personalData.resume;
  const fileName = customFilename || `${personalData.name.replace(/\s+/g, '_')}_Resume.pdf`;

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch resume file: HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      console.warn('Expected application/pdf but received text/html from server');
      // Direct navigation fallback so user can see what was returned
      window.open(fileUrl, '_blank');
      return false;
    }

    const blob = await response.blob();
    // Force application/pdf MIME type
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(pdfBlob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = fileName;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(() => {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);

    return true;
  } catch (error) {
    console.error('Blob download encountered an error, falling back to direct anchor:', error);
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = fileName;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(() => {
      document.body.removeChild(anchor);
    }, 1000);
    return false;
  }
}

/**
 * Opens the resume PDF directly in a new browser tab for viewing.
 */
export function openResumeInBrowser(): void {
  window.open(personalData.resume, '_blank', 'noopener,noreferrer');
}
