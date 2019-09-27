# Serina

[![Build Status](https://travis-ci.org/h-dong/Serina.svg?branch=master)]()
[![GitHub Release](https://img.shields.io/github/release/h-dong/serina.svg)]()
[![GitHub Issues Open](https://img.shields.io/github/issues-raw/h-dong/serina.svg)]()
[![GitHub Last Commit](https://img.shields.io/github/last-commit/h-dong/serina.svg)]()
[![GitHub License](https://img.shields.io/github/license/h-dong/serina.svg)]()

[![Netlify Build Status](https://api.netlify.com/api/v1/badges/debe4f89-718a-43de-b3b7-0b791ae709fe/deploy-status)](https://app.netlify.com/sites/serina/deploys)
[![BCH compliance](https://bettercodehub.com/edge/badge/h-dong/Serina?branch=master)](https://bettercodehub.com/)
[![codecov](https://codecov.io/gh/h-dong/Serina/branch/master/graph/badge.svg)](https://codecov.io/gh/h-dong/Serina)

Natural Language Parser for date and time in Javascript.

## STILL UNDER DEVELOPMENT, NOT READY FOR ALPHA!

## Introduction
Serina can parse English phrases and return an object that is easier to work. This project is inspired by [Sherlock](!https://github.com/neilgupta/Sherlock) project. The name comes from the Xbox Game "Halo wars", where she was the Artificial Intelligence of the UNSC navy ship  - Spirit of Fire.

## Installation

Simply run `npm install serina`

## Usage

If using ES5

```js
var Serina = require('serina');

var parsed = Serina('Remind me to buy milk tomorrow 3pm'); // assuming it is currently 29th Oct 2017

console.log(parsed);

// assuming current time is 2019/09/10 1pm, console output
{
    "original": "Remind me to buy milk tomorrow 3pm",
    "isValid": true,
    "matches": [
        {
            "text": "Remind me to buy milk tomorrow",
            "dateTime": "2019-09-10T15:00:00.000Z",
            "matched": "3pm"
        },
        {
            "text": "Remind me to buy milk 3pm",
            "dateTime": "2019-09-11T00:00:00.000Z",
            "matched": "tomorrow"
        },
        {
            "text": "Remind me to buy milk",
            "dateTime": "2019-09-11T15:00:00.000Z",
            "matched": "tomorrow 3pm"
        }
    ]
}
```

Or use import if using ES6

```js
import Serina from 'serina';

const parsed = Serina('Remind me to buy milk tomorrow 3pm');
```

## Progress

This project is currently developed by just me, so can't say when the library will be ready. But just to give a high level breakdown, here is everything I'm planning to include:

### Milestone 1

- [x] ~~Parse weekdays e.g. `tue`, `tuesday`~~
- [x] ~~Parse day e.g. `11th`, `2nd`~~
- [x] ~~Parse month e.g. `july`, `jan`~~
- [x] ~~Parse year e.g. `2018`, `9999`~~
- [x] ~~Parse time e.g. `5pm`, `5:00am`, `15:00`~~
- [x] ~Parse combined day, month and year e.g. `11th June 2019`, `11/09/2018`~
- [x] ~Parse incomplete date formats e.g. `20/08` or `Jan 2020`~
- [x] ~Parse combined date and time e.g. `20/10/2019 8pm`, `11th 14:00`~
- [x] ~Parse day of week with time e.g. `4pm Mon`, `Tuesday 5:30pm`~
- [x] ~Parse relative time e.g. `in half an hour`, `4 hours from now`~
- [x] ~Parse relative days e.g. `today`, `tomorrow`, `a week from now`~
- [x] ~Parse relative dates e.g. `next year`, `2 weeks from now`~
- [ ] Parse combined relative date and time e.g. `a week from now 2pm`

### Milestone 2

- [ ] Parse date range e.g. `tue - thu`, `4th july to 8th aug`
- [ ] Parse time range e.g. `between 5pm and 8pm`
- [ ] Parse international date formats better e.g. `2018/06/21`

### Milestone 3

- [ ] Parse more UK keywords e.g. `oxt`, `fortnight`
- [ ] Parse more advanced time e.g. `seconds`, `millisecond`

## Edge cases / Limitations

People could express dates & time in many different ways, and sometimes there's no one clear logical choice. In these situations, I'll try to list them here so everyone's aware about these edge cases and what the expected outcome should be. If people have any suggestions for these decisions feel free to raise an issue about it where we can discuss it in more detail. I'm happy for any of these to be challenged!

### Resolve "Next 31st" when the current/next month doesn't have 31 days

Given current date is 20th February, the logical month for "next" in this case should be February itself since 31st is greater than 20th. However, February only has 28 or 29 days depending on if it is a leap year. The current logic is to skip Feb and look for "next month which has 31 days". So in this case Shiva will resolve "next 31st" to be 31st March.

### Week day v.s. day of the week

Week day normally refers to Mon - Fri and excludes weekends, but for the sake of simplicity (and looking at other libs) I decided it is much easier to just refer to "day of the week" as "week day" in the code.

### Only match year 1000 - 9999

Currently the library only find matched YEAR between (1000 - 9999). This could be a limitation for some people, so we may need to come back and address this. Please raise an issue if this is an problem for you.
