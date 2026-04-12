// ============================================================
// utils/random.js
// Random number generation using curated "mentally workable" pools.
// WHY: If we used pure Math.random(), we might get ugly numbers like
// $347,291 for 7.3% — impossible to do in your head. By picking from
// clean lists, every drill is actually solvable mentally.
// ============================================================

window.BitPitch = window.BitPitch || {};

window.BitPitch.random = (function () {

  // --- Curated number pools ---
  // These are the only values that will appear in drills.
  // All chosen to produce round answers when combined.

  var NICE_ASKS = [
    100000, 150000, 200000, 250000, 300000,
    400000, 500000, 600000, 750000, 1000000
  ];

  var NICE_PERCENTAGES = [5, 10, 12, 15, 20, 25, 30, 33, 40, 50];

  // Valuations chosen so that Ask / Valuation gives a clean percentage
  var NICE_VALUATIONS = [
    500000, 1000000, 1500000, 2000000, 2500000,
    3000000, 4000000, 5000000, 8000000, 10000000,
    12000000, 15000000, 20000000
  ];

  var NICE_REVENUES = [
    100000, 250000, 400000, 500000, 750000,
    1000000, 1200000, 1500000, 2000000, 3000000,
    4000000, 5000000, 8000000, 10000000
  ];

  // Nice base numbers for the Double-Triple-Halve exercise
  var NICE_BASE_NUMBERS = [
    500, 800, 1200, 2500, 4000, 5000,
    8000, 10000, 15000, 25000, 32000, 50000,
    80000, 100000, 200000
  ];

  // Fake company names for the multiples exercise (just for fun)
  var FAKE_COMPANIES = [
    'SnackBot', 'PetNest', 'CleanDash', 'GrowBot', 'BrunchBox',
    'FitLoop', 'SleepPod', 'TasteByte', 'PixelFarm', 'DeskKit',
    'NapCloud', 'RunWise', 'ChillBrew', 'WalkCo', 'MindMesh'
  ];

  var TAM_CATEGORIES = [
    { label: 'US coffee drinkers', customers: '150M', spend: '$200/yr', answer: 30000000000 },
    { label: 'US gym members', customers: '60M', spend: '$500/yr', answer: 30000000000 },
    { label: 'US dog owners', customers: '90M', spend: '$400/yr', answer: 36000000000 },
    { label: 'US freelancers', customers: '60M', spend: '$300/yr', answer: 18000000000 },
    { label: 'US online shoppers', customers: '200M', spend: '$1,200/yr', answer: 240000000000 },
    { label: 'US podcast listeners', customers: '80M', spend: '$50/yr', answer: 4000000000 },
    { label: 'US remote workers', customers: '40M', spend: '$600/yr', answer: 24000000000 },
    { label: 'US college students', customers: '20M', spend: '$800/yr', answer: 16000000000 }
  ];

  // --- Helper functions ---

  // Pick a random item from an array
  function randFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Random integer between min and max (inclusive)
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate a triangle (Ask, Equity%, Valuation) where the math always works out cleanly.
  // Strategy: pick equity% and valuation first, then derive ask = equity * valuation.
  // When equity is 33, use true division (valuation / 3) so Hard can require 2dp precision.
  function randTriangle() {
    var equity = randFrom(NICE_PERCENTAGES);
    var valuation = randFrom(NICE_VALUATIONS);
    var ask = (equity === 33) ? valuation / 3 : Math.round((equity / 100) * valuation);
    return { ask: ask, equity: equity, valuation: valuation };
  }

  // Parse user input that might include $, commas, K, M suffixes.
  // Examples: "$1.2M" -> 1200000, "$500K" -> 500000, "2,500" -> 2500
  function parseUserNumber(str) {
    if (!str) return NaN;
    var s = str.toString().trim().toUpperCase();
    s = s.replace(/\$/g, '').replace(/,/g, '').trim();
    var multiplier = 1;
    if (s.endsWith('M')) { multiplier = 1000000; s = s.slice(0, -1); }
    else if (s.endsWith('K')) { multiplier = 1000; s = s.slice(0, -1); }
    else if (s.endsWith('B')) { multiplier = 1000000000; s = s.slice(0, -1); }
    var n = parseFloat(s);
    return isNaN(n) ? NaN : n * multiplier;
  }

  // Format a number as money: 1200000 -> "$1.2M", 500000 -> "$500K"
  function formatMoney(n) {
    if (n >= 1000000000) return '$' + (n / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (n >= 1000000) return '$' + (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
    return '$' + n;
  }

  // Format a large number without $ (for TAM, customer counts)
  function formatNumber(n) {
    if (n >= 1000000000) return (n / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000) return Math.round(n / 1000) + 'K';
    return '' + n;
  }

  // Format a dollar value to a specific number of decimal places (for Hard 2dp display).
  // Falls back to formatMoney when dp is 0.
  function formatMoneyDp(n, dp) {
    if (dp === 0) return formatMoney(Math.round(n));
    var str = parseFloat(n.toFixed(dp)).toFixed(dp);
    var parts = str.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + parts[0] + '.' + parts[1];
  }

  // Format a plain number to a specific number of decimal places (for Hard 2dp display).
  // Falls back to formatNumber when dp is 0.
  function formatNumberDp(n, dp) {
    if (dp === 0) return formatNumber(Math.round(n));
    var str = parseFloat(n.toFixed(dp)).toFixed(dp);
    var parts = str.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts[0] + '.' + parts[1];
  }

  // Public API
  return {
    randFrom: randFrom,
    randInt: randInt,
    randTriangle: randTriangle,
    parseUserNumber: parseUserNumber,
    formatMoney: formatMoney,
    formatMoneyDp: formatMoneyDp,
    formatNumber: formatNumber,
    formatNumberDp: formatNumberDp,
    NICE_ASKS: NICE_ASKS,
    NICE_PERCENTAGES: NICE_PERCENTAGES,
    NICE_VALUATIONS: NICE_VALUATIONS,
    NICE_REVENUES: NICE_REVENUES,
    NICE_BASE_NUMBERS: NICE_BASE_NUMBERS,
    FAKE_COMPANIES: FAKE_COMPANIES,
    TAM_CATEGORIES: TAM_CATEGORIES
  };

})();
