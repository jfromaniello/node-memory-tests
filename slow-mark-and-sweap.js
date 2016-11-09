const GcStats = require('gc-stats');
const gcStats = GcStats();

const gcType = new Map([
  [1,  'Scavenge'],
  [2,  'MarkSweepCompact'],
  [4,  'IncrementalMarking'],
  [8,  'WeakPhantomCallbackProcessing'],
  [15, 'All']
]);

const stuf = [];

gcStats.on('stats', function (stats) {
  if (stats.pauseMS < 100) { return; }
  stats.type = gcType.get(stats.gctype);
  console.log('GC happened', stats);
  if (stats.pauseMS > 300) { stuf.splice(0); }
});

setInterval(() => {
  var start = Date.now();
  while(Date.now() - start < 1200){
    stuf.push(stuf);
    stuf.push({});
  }
  console.log('----iteration finished----');
}, 5000);
