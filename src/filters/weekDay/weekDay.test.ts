import { DateTime, Settings } from 'luxon';
import WeekDay from './weekDay';
import { ParsedMatchSchema } from '../../serina.schema';

describe('Day Of The Week', () => {
    const mockWeekday = weekday => DateTime.local()
        .set({ weekday })
        .startOf('day')
        .toJSDate();

    beforeAll(() => {
        Settings.now = () => new Date(2019, 0, 19).valueOf(); // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
    });

    describe('parseText()', () => {
        test('should find a single match', () => {
            const text = 'hand in paper on mon';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(8),
                    text: 'hand in paper',
                    matched: 'on mon',
                },
            ];

            expect(WeekDay.parseText(text)).toEqual(result);
        });

        test('should find multiple matches', () => {
            const text = "hand in tuesday's paper on mon";
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(9),
                    text: "hand in 's paper on mon",
                    matched: 'tuesday',
                },
                {
                    dateTime: mockWeekday(8),
                    text: "hand in tuesday's paper",
                    matched: 'on mon',
                },
            ];
            expect(WeekDay.parseText(text)).toEqual(result);
        });
    });

    describe('matchWeekdays()', () => {
        test('should match monday', () => {
            expect(WeekDay.matchWeekdays('mon')).toEqual(['mon']);
            expect(WeekDay.matchWeekdays('Mon')).toEqual(['mon']);
            expect(WeekDay.matchWeekdays('monday')).toEqual(['monday']);
            expect(WeekDay.matchWeekdays('Monday')).toEqual(['monday']);
        });

        test('should match tuesday', () => {
            expect(WeekDay.matchWeekdays('tue')).toEqual(['tue']);
            expect(WeekDay.matchWeekdays('Tue')).toEqual(['tue']);
            expect(WeekDay.matchWeekdays('tues')).toEqual(['tues']);
            expect(WeekDay.matchWeekdays('Tues')).toEqual(['tues']);
            expect(WeekDay.matchWeekdays('tuesday')).toEqual(['tuesday']);
            expect(WeekDay.matchWeekdays('Tuesday')).toEqual(['tuesday']);
        });

        test('should match wednesday', () => {
            expect(WeekDay.matchWeekdays('wed')).toEqual(['wed']);
            expect(WeekDay.matchWeekdays('Wed')).toEqual(['wed']);
            expect(WeekDay.matchWeekdays('wedn')).toEqual(['wedn']);
            expect(WeekDay.matchWeekdays('Wedn')).toEqual(['wedn']);
            expect(WeekDay.matchWeekdays('wednesday')).toEqual(['wednesday']);
            expect(WeekDay.matchWeekdays('Wednesday')).toEqual(['wednesday']);
        });

        test('should match thursday', () => {
            expect(WeekDay.matchWeekdays('thu')).toEqual(['thu']);
            expect(WeekDay.matchWeekdays('Thu')).toEqual(['thu']);
            expect(WeekDay.matchWeekdays('thur')).toEqual(['thur']);
            expect(WeekDay.matchWeekdays('Thur')).toEqual(['thur']);
            expect(WeekDay.matchWeekdays('thursday')).toEqual(['thursday']);
            expect(WeekDay.matchWeekdays('Thursday')).toEqual(['thursday']);
        });

        test('should match friday', () => {
            expect(WeekDay.matchWeekdays('fri')).toEqual(['fri']);
            expect(WeekDay.matchWeekdays('Fri')).toEqual(['fri']);
            expect(WeekDay.matchWeekdays('friday')).toEqual(['friday']);
            expect(WeekDay.matchWeekdays('Friday')).toEqual(['friday']);
        });

        test('should match saturday', () => {
            expect(WeekDay.matchWeekdays('sat')).toEqual(['sat']);
            expect(WeekDay.matchWeekdays('Sat')).toEqual(['sat']);
            expect(WeekDay.matchWeekdays('saturday')).toEqual(['saturday']);
            expect(WeekDay.matchWeekdays('Saturday')).toEqual(['saturday']);
        });

        test('should match sunday', () => {
            expect(WeekDay.matchWeekdays('sun')).toEqual(['sun']);
            expect(WeekDay.matchWeekdays('Sun')).toEqual(['sun']);
            expect(WeekDay.matchWeekdays('sunday')).toEqual(['sunday']);
            expect(WeekDay.matchWeekdays('Sunday')).toEqual(['sunday']);
        });
    });
    describe('Parse Text Contains Weekday', () => {
        let result: ParsedMatchSchema[];
        const relativeFutureArray = ['buy milk', 'buy milk for', 'buy milk next', 'buy milk this'];
        const relativePastArray = ['buy milk last', 'buy milk prev', 'buy milk previous'];

        beforeEach(() => {
            result = [
                {
                    dateTime: null,
                    text: 'buy milk',
                    matched: '',
                },
            ];
        });

        describe('For Monday', () => {
            const weekdayArray = ['mon', 'monday'];
            test('should parse date correctly for next monday', () => {
                result[0].dateTime = mockWeekday(8);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last monday', () => {
                result[0].dateTime = mockWeekday(1);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Tuesday', () => {
            const weekdayArray = ['tue', 'tues', 'tuesday'];

            test('should parse date correctly for next tuesday', () => {
                result[0].dateTime = mockWeekday(9);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last tuesday', () => {
                result[0].dateTime = mockWeekday(2);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Wednesday', () => {
            const weekdayArray = ['wed', 'wedn', 'wednesday'];

            test('should parse date correctly for next wednesday', () => {
                result[0].dateTime = mockWeekday(10);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last wednesday', () => {
                result[0].dateTime = mockWeekday(3);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Thursday', () => {
            const weekdayArray = ['thu', 'thur', 'thursday'];

            test('should parse date correctly for next thursday', () => {
                result[0].dateTime = mockWeekday(11);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last thursday', () => {
                result[0].dateTime = mockWeekday(4);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Friday', () => {
            const weekdayArray = ['fri', 'friday'];

            test('should parse date correctly for next friday', () => {
                result[0].dateTime = mockWeekday(12);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last friday', () => {
                result[0].dateTime = mockWeekday(5);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Saturday', () => {
            const weekdayArray = ['sat', 'saturday'];

            test('should parse date correctly for next saturday', () => {
                result[0].dateTime = mockWeekday(13);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last saturday', () => {
                result[0].dateTime = mockWeekday(6);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Sunday', () => {
            const weekdayArray = ['sun', 'sunday'];

            test('should parse date correctly for next sunday', () => {
                result[0].dateTime = mockWeekday(7);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last sunday', () => {
                result[0].dateTime = mockWeekday(0);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });
    });
});
