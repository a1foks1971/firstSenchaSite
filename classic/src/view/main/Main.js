Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.panel.Panel', // Classic Toolkit Grid
    items: [

        {
            title: 'Choose a future date:',
            width: 330,
            bodyPadding: 10,
            renderTo: Ext.getBody(),
            items: [{
                xtype: 'datepicker',
                minDate: new Date(),
                handler: function (picker, date) {
                    // do something with the selected date
                }
            }],

        }
    ]

});