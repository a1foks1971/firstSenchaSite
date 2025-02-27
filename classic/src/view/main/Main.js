Ext.define('NewExtApp.view.main.Main', {

});
start = new Date('2024-03-10 00:00:00'),
end = new Date('2024-03-11 00:00:00'),
end2 = new Date('2024-03-12 00:00:00'),
end3 = new Date('2024-03-17 00:00:00'),

console.log(Ext.Date.diff(start, end, Ext.Date.MINUTE), ' minutes'),
console.log(Ext.Date.diff(start, end, Ext.Date.HOUR), ' hours'),
console.log(Ext.Date.diff(start, end, Ext.Date.DAY), ' days'),

console.log(Ext.Date.diff(start, end2, Ext.Date.DAY), ' days'),

console.log(Ext.Date.diff(start, end,  Ext.Date.WEEK), ' weeks'),
console.log(Ext.Date.diff(start, end3, Ext.Date.WEEK), ' weeks')