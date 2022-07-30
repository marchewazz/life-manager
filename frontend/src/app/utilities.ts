export const monthsNames: string[] = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
export const daysNames: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export function getDateTime(date: Date): string {
    function padding(txt: number | string): string {
        return txt.toString().padStart(2, '0')
    }
    return `${date.getFullYear()}-${padding(date.getMonth()+1)}-${padding(date.getDate())}T${padding(date.getHours())}:${padding(date.getMinutes())}`
} 