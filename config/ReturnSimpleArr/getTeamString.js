import {ReturnArr} from "../SimpleTeamArr.js";

export async function ReturnTeamArr(teamName) {
    if (typeof teamName !== 'string') {
        return [];
    }
    const TeamArr = await ReturnArr()
    const subNames = teamName.split(' ').map(subName => subName.split('/'));
    return subNames.reduce((acc, subNameArr) => {
        const matchingTeams = subNameArr.reduce((teams, subName) => {
            const directMatch = TeamArr[subName];
            if (directMatch) {
                return [...teams, directMatch];
            }
            const letters = subName.split('');
            const combinations = generateCombinations(letters);
            const matching = combinations.filter(combo => {
                const key = combo.join('');
                return Object.keys(TeamArr).some(team => team.includes(key));
            });
            const matchingTeams = matching.map(combo => {
                const key = combo.join('');
                return TeamArr[key];
            });
            return [...teams, ...matchingTeams];
        }, []);
        return [...acc, ...matchingTeams.flat()];
    }, []);
}

function generateCombinations(letters) {
    const result = [];
    const used = new Array(letters.length).fill(false);

    function helper(combination) {
        if (combination.length === letters.length) {
            result.push([...combination]);
            return;
        }
        for (let i = 0; i < letters.length; i++) {
            if (used[i] || (i > 0 && letters[i] === letters[i - 1] && !used[i - 1])) {
                continue;
            }
            used[i] = true;
            combination.push(letters[i]);
            helper(combination);
            combination.pop();
            used[i] = false;
        }
    }

    helper([]);
    return result;
}























































































































































