Ext.define('MyModel', {
    extend: 'Ext.calendar.model.Calendar',
    proxy: {
        api: {
            read: "http://localhost:3000/calendars"
        }
    },
    eventStoreDefaults: {
        proxy: {
            api: {
                read: "http://localhost:3000/events",
                destroy: "http://localhost:3000/delete"
            }
        }
    }
    });
    
    Ext.define('NewExtApp.view.main.Main', {
    extend:"Ext.panel.Panel",
    items: [ {
        xtype: 'calendar',
        itemId: 'calendar',
        height: 400,
        width: 600,
        value: new Date('2023-02-01'),
        sideBar: {
            xtype: 'panel',
            items: [{
                xtype: 'textfield',
                itemId: 'title'
            }, {
                xtype: 'button',
                text: 'Filter by title',
                handler: function () {
                    var calendar = this.up('#calendar');
                    var title = calendar.down('#title').value;
                    calendar.getStore().getAt(0).events().filter('title', title); // Personal
                    calendar.getStore().getAt(1).events().filter('title', title); // Work
                }
            }]
        },
        store: {
            model: 'MyModel',
            autoLoad: true,
            eventStoreDefaults: {
                autoSync: true
            }
        }
    }]
    
});