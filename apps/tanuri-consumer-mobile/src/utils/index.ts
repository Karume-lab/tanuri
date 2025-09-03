export const tranformAPIErrorsToArrayOfStrings = (
  error: Record<string, string[] | undefined>,
  action: string,
): string[] => {
  const messages = Object.values(error).flat().filter(Boolean) as string[];
  return messages.length > 0
    ? messages
    : [`An error occurred while ${action}. Please try again`];
};
