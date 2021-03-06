import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { DATES, DATE_AND_TIME, PARTIAL_DATES } from 'filters/dates/dates.constants';
import RELATIVE_DATES from 'filters/relativeDates/relativeDates.constants';
import TIME from 'filters/time/time.constants';
import parseMatches from 'utils/parseMatches';
import convertDateStringToObj from 'utils/convertDateStringToObj';
import contains from 'utils/contains';
import remove from 'utils/remove';
import matchPattern from 'utils/matchPattern';
import convertTimeStringToObj from 'utils/convertTimeStringToObj';
import convertPartialDateStringToObj from 'utils/convertPartialDateStringToObj';
import convertRelativeDateStringToObj from 'utils/convertRelativeDateStringToObj';

export default class DateAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `${DATE_AND_TIME.ANY}`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removeDateFillerWords = remove(matchingText, DATES.FILLER_WORDS);
        const dateStringMatches = matchPattern(removeDateFillerWords, `(${DATES.ANY}|${PARTIAL_DATES.ANY}|${RELATIVE_DATES.ANY})`);

        if (!dateStringMatches) return null;

        const dateString = dateStringMatches[0];
        const timeString = remove(removeDateFillerWords, dateString);
        const removedTimeFillerWords = remove(timeString, TIME.FILLER_WORDS);

        let dateObj;
        if (contains(dateString, `${DATES.ANY}`)) {
            dateObj = convertDateStringToObj(dateString);
        } else if (contains(dateString, `${PARTIAL_DATES.ANY}`)) {
            dateObj = convertPartialDateStringToObj(dateString);
        } else {
            dateObj = convertRelativeDateStringToObj(dateString);
        }

        if (!dateObj) return null;

        const { day, month, year } = dateObj;
        const timeObj = convertTimeStringToObj(removedTimeFillerWords);

        if (!timeObj) return null;

        const { hour, minute } =  timeObj;
        const newDateTime = DateTime.utc().set({ day, month, year, hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
