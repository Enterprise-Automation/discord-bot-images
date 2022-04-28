const process = require('process');
const os = require('os');

let query = "";
module.exports = function (connection, params, resolve, reject) {


    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    let memoryUsageRound = Math.round(memoryUsage * 100) / 100;

   // console.log(memoryUsageRound);


    var usage = process.cpuUsage();

    usage = process.cpuUsage(usage);
    /*
        Hostname: 0d29b856116d
        Total CPUs: 8
        Total Memory: 18003.51MB
        Free Memory: 15026.67MB
        Platform: linux #1 SMP Mon Nov 8 10:21:19 UTC 2021
        System Uptime: 631831.77 seconds
        Bot Uptime: 13.87 seconds
        Disk Space: 58.4G
    
        This will return cpus, memory, free memory, disk, free disk and uptime in a nice format
    */

      const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`



 

    const memoryData = process.memoryUsage()

    let dfmemoryUsage = 
        
    

  //  console.log(dfmemoryUsage)




    //  console.log(process.resourceUsage());





    resolve({ "status": "success", "status_message": "sending back image", "discord_message": `rss: ${formatMemoryUsage(memoryData.rss)} Total memory allocated for the process execution
    heapTotal: ${formatMemoryUsage(memoryData.heapTotal)}  Total size of the allocated heap
    heapUsed: ${formatMemoryUsage(memoryData.heapUsed)} Actual memory used during the execution
    cpu: ${usage.user} Mhz cpu used during the execution
    CPUS:" ${os.cpus().length}
    totalmem: ${formatMemoryUsage(os.totalmem())}
    cfreemem: ${formatMemoryUsage(os.freemem())}` });

}