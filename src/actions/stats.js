const process = require('process');
const os = require('os');
const disk = require('diskusage');

let query = "";
module.exports = function (connection, params, resolve, reject) {


    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;


    var usage = process.cpuUsage();

    usage = process.cpuUsage(usage);

    const formatMemoryUsageMB = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`
    const formatMemoryUsageGB = (data) => `${Math.round(((data / 1024 / 1024 * 100) / 100 ) / 1024 / 1024 * 100) / 100} GB`

    const memoryData = process.memoryUsage();
    const os = require('os');
  

    var ut_sec = os.uptime();
    var ut_min = ut_sec/60;
    var ut_hour = ut_min/60;
       
    ut_sec = Math.floor(ut_sec);
    ut_min = Math.floor(ut_min);
    ut_hour = Math.floor(ut_hour);
      
    ut_hour = ut_hour%60;
    ut_min = ut_min%60;
    ut_sec = ut_sec%60;
      
    let diskFree;
    let diskTotal;

    disk.check('/', function(err, info) {
        diskFree = info.free;
        diskTotal = info.total;
    });

    console.log(formatMemoryUsageMB(diskTotal));


    resolve({
        "status": "success", "status_message": "sending back image", "discord_message": `rss: ${formatMemoryUsageMB(memoryData.rss)} Total memory allocated for the process execution
    heapTotal: ${formatMemoryUsageMB(memoryData.heapTotal)}  Total size of the allocated heap
    heapUsed: ${formatMemoryUsageMB(memoryData.heapUsed)} Actual memory used during the execution
    cpu: ${usage.user} Mhz cpu used during the execution
    CPUS: ${os.cpus().length}
    totalmem: ${formatMemoryUsageMB(os.totalmem())}
    cfreemem: ${formatMemoryUsageMB(os.freemem())}
    Up time: ${ut_hour} Hour(s) ${ut_min} minute(s) and ${ut_sec} second(s)
    Disk free ${formatMemoryUsageGB(diskFree)}
    Disk total ${formatMemoryUsageGB(diskTotal)}
    Disk used ${formatMemoryUsageGB(diskTotal - diskFree)}
    `
    });

}