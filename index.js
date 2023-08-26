/* Your Code Here */
// const testArray = ['Hanako', 'Yamada', 'CEO', '50']
const testArrays = [ ['Hanako', 'Yamada', 'CEO', '50'], ['Daisuke', 'Tanaka', 'Comedian', '100']]
// const testemployeeRecord = {
//     firstName: 'Hanako',
//     familyName: 'Yamada',
//     title: 'CEO',
//     payPerHour: '50',
//     timeInEvents:[
//         {
//         type:'TimeIn',
//         hour: '800',
//         date: '2023-01-01'
//         },
//         {
//             type:'TimeIn',
//             hour: '900',
//             date: '2023-01-02'
//             }

//     ], 
//     timeOutEvents: [
//         {
//             type:'TimeOut',
//             hour: '1800',
//             date: '2023-01-01'
//             },
//             {
//                 type:'TimeOut',
//                 hour: '2000',
//                 date: '2023-01-02'
//                 }
     
//     ],
// }
const testemployeeRecords = [
    {
    firstName: 'Daisuke',
    familyName: 'Tanaka',
    title: 'CFO',
    payPerHour: '20',
    timeInEvents:[
        {
        type:'TimeIn',
        hour: '800',
        date: '2023-01-01'
        },
        {
            type:'TimeIn',
            hour: '1000',
            date: '2023-01-02'
            }

    ], 
    timeOutEvents: [
        {
            type:'TimeOut',
            hour: '1900',
            date: '2023-01-01'
            },
            {
                type:'TimeOut',
                hour: '2000',
                date: '2023-01-02'
                }
     
    ],
},
{
    firstName: 'Hanako',
    familyName: 'Yamada',
    title: 'CEO',
    payPerHour: '50',
    timeInEvents:[
        {
        type:'TimeIn',
        hour: '800',
        date: '2023-01-01'
        },
        {
            type:'TimeIn',
            hour: '900',
            date: '2023-01-02'
            }

    ], 
    timeOutEvents: [
        {
            type:'TimeOut',
            hour: '1800',
            date: '2023-01-01'
            },
            {
                type:'TimeOut',
                hour: '2000',
                date: '2023-01-02'
                }
     
    ],
}
]

function createEmployeeRecord(arr){
    let employeeRecord = {
        firstName: arr[0],
        familyName: arr[1], 
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords(arr){
    let employeeRecords = [];
    for (const element of arr){
        employeeRecords.push(createEmployeeRecord(element))
    }
    return employeeRecords;
}

function createTimeInEvent(timestamp){
    let timeIn = {
        type: 'TimeIn',
        hour: parseInt(timestamp.slice(11, 15)),
        date: timestamp.slice(0,10)
    }
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(timestamp){
    let timeOut = {
        type: 'TimeOut',
        hour: parseInt(timestamp.slice(11, 15)),
        date: timestamp.slice(0,10)
    }
    this.timeOutEvents.push(timeOut);
    return this;
}

function hoursWorkedOnDate(date){
    let timeInTime = '';
    let timeInArray = this.timeInEvents;
    for (const id in timeInArray){
        if(timeInArray[id].date ===date){
            timeInTime = timeInArray[id].hour;
        }
    }
    let timeOutTime = '';
    let timeOutArray = this.timeOutEvents;
    for (const id in timeOutArray){
        if(timeOutArray[id].date===date){
            timeOutTime = timeOutArray[id].hour;
        }
    }
    const hoursWorked = (timeOutTime-timeInTime)/100;
    return hoursWorked;
}

function wagesEarnedOnDate(date){
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const hourlyPay = this.payPerHour;
    const wagesEarned = hoursWorked*hourlyPay;
    return wagesEarned;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (collection, firstNameString){
    let result = '';
    for (const id in collection){
        if (collection[id].firstName===firstNameString){
            result = collection[id];
        }else{
            result = undefined;
        }
    return result;
    }
}

function calculatePayroll (employeeRecords){
    let eachEmployeePay = [];
    for (const id in employeeRecords){
        eachEmployeePay.push(allWagesFor.call(employeeRecords[id]))
    }
    const totalPay = eachEmployeePay.reduce((x, y) => x+y)
    return totalPay;
}