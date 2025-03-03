Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.Container',
    padding: 10,
        items: {
            xtype: 'button',
            text: 'My Button',
           // badgeText: '2',
            handler: function () {
    
    var extDate1 = Ext.Date.parse('2018-03-25T02:00:00Z', 'c'),
    nativeDate1 = new Date('2018-03-25T02:00:00Z'), //native version
    extDate2 = Ext.Date.parse('2018-03-25T03:00:00Z', 'c'),
    nativeDate2 = new Date('2018-03-25T03:00:00Z');
    //Expected Sun Mar 25 2018 04:00:00 GMT+0200
    console.log('extDate1', extDate1);
    console.log('nativeDate1', nativeDate1);
        }
    }
});