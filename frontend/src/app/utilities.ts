import moment from 'moment';
import 'moment-precise-range-plugin';

export const monthsNames: string[] = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

export const daysNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getDateTime(date: Date): string {
    function padding(txt: number | string): string {
        return txt.toString().padStart(2, '0')
    }
    return `${date.getFullYear()}-${padding(date.getMonth()+1)}-${padding(date.getDate())}T${padding(date.getHours())}:${padding(date.getMinutes())}`
} 

export function getDatesPastAndUpcoming(dates: any) {
    var sortedDates: any = {
        past: [],
        upcoming: [],
    }

    for (const date of dates) {
        if (new Date(date.dateTime) > new Date()) sortedDates.upcoming.push(date)
        if (new Date(date.dateTime) < new Date()) sortedDates.past.push(date)
    }

    return sortedDates;
}

export function sortDatesArray(array: any[]): any[] {
    return array.sort((object1: any, object2: any) => { return new Date(object1.dateTime).getTime() - new Date(object2.dateTime).getTime() })
}

export function testEmail(email: string): boolean {
    return new RegExp(/^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i).test(email)
}

export function testPassword(password: string): boolean {
    return new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(password)
}

export function countRemainingTime(date: Date): string {

    function getMomentObject(date: Date): moment.Moment {
        return moment({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()});
    }

    const nowDate = new Date();
    nowDate.setSeconds(0);
    nowDate.setMilliseconds(0);
    return moment.preciseDiff(getMomentObject(nowDate), getMomentObject(new Date(date)))
}