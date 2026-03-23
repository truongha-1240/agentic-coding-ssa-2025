/**
 * Format a heart/stat count with comma separators (e.g., 1000 → "1,000")
 */
export function formatHeartCount(count: number): string {
	return count.toLocaleString("en-US");
}

/**
 * Format a timestamp to "HH:mm - MM/DD/YYYY" (e.g., "16:00 - 10/30/2025")
 */
export function formatTimestamp(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date;
	const hours = d.getHours().toString().padStart(2, "0");
	const minutes = d.getMinutes().toString().padStart(2, "0");
	const month = (d.getMonth() + 1).toString().padStart(2, "0");
	const day = d.getDate().toString().padStart(2, "0");
	const year = d.getFullYear();
	return `${hours}:${minutes} - ${month}/${day}/${year}`;
}
