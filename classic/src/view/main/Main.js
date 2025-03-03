Ext.define('NewExtApp.view.main.Main', {

});

var extDate1 = Ext.Date.parse('2018-03-25T02:00:00Z', 'c');
console.log('extDate1', extDate1);
var nativeDate1 = new Date('2018-03-25T02:00:00Z');
console.log('nativeDate1', nativeDate1);
console.log(' ');

var extDate2 = Ext.Date.parse('2018-03-25T03:00:00Z', 'c');
console.log('extDate2', extDate2);
var nativeDate2 = new Date('2018-03-25T03:00:00Z');
console.log('nativeDate2', nativeDate2);
console.log(' ');
        
var dateTimeStr = '2018-03-25 02:00:00';
console.log('dateTimeStr ', dateTimeStr);
var parsedExtDate = Ext.Date.parse(dateTimeStr, 'Y-m-d H:i:s');
console.log('parsed Ext Date ', parsedExtDate);
console.log(' ');

var timeStr = '02:00:00';
console.log('timeStr ', timeStr);
var parsedExtDateWithTime = Ext.Date.parse('2018-03-25 ' + timeStr, 'Y-m-d H:i:s');
console.log('parsed Ext Date With Time ', parsedExtDateWithTime);
console.log(' ');

var HoursModetimeStr = '2:00 AM';
console.log('HoursModetimeStr ', HoursModetimeStr);
var parsedExtDateWithHoursMode = Ext.Date.parse('2018-03-25 ' + HoursModetimeStr, 'Y-m-d g:i A');
console.log('parsed Ext Date With 12 Hours Mode ', parsedExtDateWithHoursMode);
console.log(' ');

var currentDate = '2018-03-25';
console.log('currentDate ', currentDate);
var parsedExtDay = Ext.Date.format(Ext.Date.parse(currentDate, 'Y-m-d'), 'd');
console.log('parsed Ext Day ', parsedExtDay);
console.log(' ');
