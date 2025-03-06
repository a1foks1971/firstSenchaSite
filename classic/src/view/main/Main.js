Ext.define('NewExtApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    defaults: {
        bodyPadding: 10,
        scrollable: true,
        closable: true,
        border: false
    },
    
    width: 300,
    height: 400,
    tabPosition: 'left',
    items: [{
        title: 'Tab 1',
    
    html: 'Content 1'
    }, {
        title: 'Tab 2',
    
    html: 'Content 2, Content 2'
    }, {
        title: 'Tab 3',
    
    html: 'Content 3, Content 3, Content 1'
    }],
    renderTo: Ext.getBody()
    
    });