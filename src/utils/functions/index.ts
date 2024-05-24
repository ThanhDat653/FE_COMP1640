export function formatDate(dateTimeString: string): string {
   const date = new Date(dateTimeString);

   if (isNaN(date.getTime())) {
      return "";
   }

   const day = String(date.getDate()).padStart(2, "0");
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const year = date.getFullYear();

   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");
   return `${day}/${month}/${year} | ${hours}:${minutes}`;
}

export function roundToTwoDecimal(num: number): number {
   return Math.round(num * 100) / 100;
}
