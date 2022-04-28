const process = require('process');
const os = require('os');
const disk = require('diskusage');

let query = "";
module.exports = function (connection, params, resolve, reject) {


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




    resolve({"status": "success", "status_message": "sending back image", "discord_message": `**Stats:**
    Rss: ${formatMemoryUsageMB(memoryData.rss)} Total memory allocated for the process execution
    HeapTotal: ${formatMemoryUsageMB(memoryData.heapTotal)}  Total size of the allocated heap
    HeapUsed: ${formatMemoryUsageMB(memoryData.heapUsed)} Actual memory used during the execution
    Total memory: ${formatMemoryUsageMB(os.totalmem())}
    Free memory: ${formatMemoryUsageMB(os.freemem())}
    ----------------------------------------------------
    CPU: ${usage.user} Mhz cpu used during the execution
    CPUS: ${os.cpus().length}
    ----------------------------------------------------
    Disk free ${formatMemoryUsageGB(diskFree)}
    Disk total ${formatMemoryUsageGB(diskTotal)}
    Disk used ${formatMemoryUsageGB(diskTotal - diskFree)}
    ----------------------------------------------------
    Up time: ${ut_hour} Hour(s) ${ut_min} minute(s) and ${ut_sec} second(s)
    `
    });

}