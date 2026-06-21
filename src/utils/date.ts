export function calculatePlanDay(startDateStr: string | null): number | null {
  if (!startDateStr) return null;
  
  const start = new Date(startDateStr);
  start.setHours(0, 0, 0, 0); // Standardize to midnight local time
  
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Standardize to midnight local time
  
  const diffTime = now.getTime() - start.getTime();
  
  // Convert diff in milliseconds to days
  // If exactly same day, diffTime is 0, so it's Day 1
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  
  return diffDays + 1;
}

export function formatDateBR(dateStr: string): string {
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(d);
}

export function truncateToMidnight(date: Date = new Date()): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}
