
console.log("dadsfasssssssd");

const json  = [
    {
        "id": "ticket:1",
        "name": "Amazon Ad Suite - February 2024",
        "steps": [
            {
                "stepName": "Creative Brief",
                "createdAt": "2024-01-11T05:43:00.000Z"
            },
            {
                "stepName": "Mood Board",
                "createdAt": "2024-01-12T17:22:00.000Z"
            },
            {
                "stepName": "Design Review",
                "createdAt": "2024-01-15T10:00:00.000Z"
            },
            {
                "stepName": "Delivery",
                "createdAt": "2024-01-22T13:00:00.000Z"
            }
        ]
    },
    {
        "id": "ticket:2",
        "name": "Webinar Banner - March 2024",
        "steps": [
            {
                "stepName": "Creative Brief",
                "createdAt": "2024-02-28T09:30:00.000Z"
            },
            {
                "stepName": "Mood Board",
                "createdAt": "2024-03-01T11:45:00.000Z"
            },
            {
                "stepName": "Design Review",
                "createdAt": "2024-03-05T14:30:00.000Z"
            }
        ]
    },
    {
        "id": "ticket:3",
        "name": "Social Media Campaign - April 2024",
        "steps": [
            {
                "stepName": "Creative Brief",
                "createdAt": "2024-03-14T08:20:00.000Z"
            }
        ]
    }
]

class Data {
    public total = 0;
    public count = 0;

    constructor() {
        this.total = 0;
        this.count = 0;
    }
}


type myJson = typeof json

function translateToAvgTimes(json: myJson): Map<string, Data> {
    const stepNameToData = new Map<string, Data>();

    for(const ticket of json) {
        const stepsArray = ticket.steps;

        let lastStepTime;
        let lastStepName = "";
        for(const step of stepsArray) {
            const key = step.stepName;
            const value = step.createdAt;
            const msEpoch = new Date(value).getTime();
            if(lastStepTime != undefined) {
                const timeToRun = msEpoch - lastStepTime;
                let newData = stepNameToData.get(lastStepName);
                if(newData === undefined) {
                    newData = new Data();
                    stepNameToData.set(lastStepName, newData);
                }

                newData.count++;
                newData.total += timeToRun;
            }

            lastStepTime = msEpoch;
            lastStepName = key;
        }
    }


    return stepNameToData;
}

const ans = translateToAvgTimes(json);

let jsonAnswer = "{";
let i = 0;
for(const [key, value] of ans) {
    console.log("category="+key+" avg="+value.total/value.count);
    jsonAnswer += "\""+key+"\": "+value.total/value.count;
    if(i < ans.size-1) {
        jsonAnswer += ",";
    }
    jsonAnswer += "\n";
    i++;
}
jsonAnswer += "}";

console.log("numbers3="+jsonAnswer);
