/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date to ISO string (YYYY-MM-DD)
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format a date range (e.g., "Jan 2023 - Present")
 */
export function formatDateRange(startDate: string, endDate: string | null): string {
  const formatMonthYear = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : 'Present';

  return `${start} - ${end}`;
}
