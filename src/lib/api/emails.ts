// lib/api/emails.ts
import { EmailApiResponse, EmailTypes } from "@/types/global";

export class NoEmailsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoEmailsError';
  }
}

export async function fetchEmails(type: EmailTypes, page: number): Promise<EmailApiResponse> {
  const response = await fetch(`/api/emails?type=${type}&page=${page}&limit=20`);
  if (!response.ok) {
    throw new Error('No emails available at the moment, please try again later.', {'cause':'OOPS.I.DONT.KNOW.WHAT.HAPPENED'});
  }

  const data: EmailApiResponse = await response.json();

  // If the emails array is empty and it's the first page (page=1), throw a NoEmailsError
  if (data.emails.length === 0 && page === 1) {
    throw new NoEmailsError(`No emails found in ${type}`);
  }

  return data;
}