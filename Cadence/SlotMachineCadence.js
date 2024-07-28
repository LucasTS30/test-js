"use strict";
/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
const anticipatorConfig = {
    columnSize: 5,
    minToAnticipate: 2,
    maxToAnticipate: 3,
    anticipateCadence: 2,
    defaultCadence: 0.25,
};
/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds = {
    roundOne: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 1, row: 3 },
            { column: 3, row: 4 },
        ],
    },
    roundTwo: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 0, row: 3 },
        ],
    },
    roundThree: {
        specialSymbols: [
            { column: 4, row: 2 },
            { column: 4, row: 3 },
        ],
    },
};
/**
 * This must be used to get all game rounds cadences.
 */
const slotMachineCadences = { roundOne: [], roundTwo: [], roundThree: [] };
/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(specialSymbols) {
    let countSpecialSymbol = 0;
    let lastPositionSpecialSymbol = 0;
    let arrayColumnsCadence = Array(anticipatorConfig.columnSize).fill(0);
    for (let i = 0; i < arrayColumnsCadence.length; i++) {
        for (let coordinate of specialSymbols) {
            if (coordinate.column === i) {
                countSpecialSymbol++;
                lastPositionSpecialSymbol = coordinate.column;
            }
        }
        if (countSpecialSymbol == anticipatorConfig.minToAnticipate && countSpecialSymbol != anticipatorConfig.maxToAnticipate) {
            if (i === 0) {
                continue;
            }
            else if (i == (arrayColumnsCadence.length - 1) && i === lastPositionSpecialSymbol) {
                arrayColumnsCadence[i] = arrayColumnsCadence[i - 1] + anticipatorConfig.defaultCadence;
            }
            else {
                arrayColumnsCadence[i] = arrayColumnsCadence[i - 1] + anticipatorConfig.anticipateCadence;
            }
        }
        else {
            if (i === 0) {
                continue;
            }
            else {
                arrayColumnsCadence[i] = arrayColumnsCadence[i - 1] + anticipatorConfig.defaultCadence;
            }
        }
    }
    return arrayColumnsCadence;
}
/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds) {
    slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
    slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
    slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);
    return slotMachineCadences;
}
console.log('CADENCES: ', handleCadences(gameRounds));
