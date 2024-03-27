import { AlertQuestion } from "./AlertQuestion ";

export const AlertToApproveTimeEntries = (onApprove: () => void) =>
  AlertQuestion(
    "Godkänna aktiviteter",
    "Är du säker på att du vill godkänna de markerade aktiviteterna?",
    onApprove,
  );
