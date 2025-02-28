var myStore = {
    autoLoad: true,
    // storeId: 'peronsStore',
    proxy: {
        type: 'ajax',
        url: 'classic/resources/calendar.json',
    },
    eventStoreDefaults: {
        proxy: {
            type: 'ajax',
            url: "classic/resources/events.json",
            extraParams: {
                fromDate: '{dateFrom}', //taken from viewModel?
                toDate: '{dateTo}' //taken from viewModel?
            },
        }
    }
    };
    
    Ext.define('NewExtApp.view.main.Main', {
    extend: "Ext.panel.Panel",
    fullscreen: true,
    scrollable: true,
    tabBarPosition: 'top',
    layout: 'fit',
    padding: 10,
    defaults: {
        margin: 10
    },
    viewModel: {
        data: {
            search: {
                fromDate: new Date(),
                toDate: new Date()
            }
        }
    },
    items: [{
        xtype: 'calendar',
        id: 'mycalendar',
        store: myStore,
        flex: 1,
        value: new Date('02/01/2024'),
        viewModel: {
            data: {
                dateFrom: new Date(),
                dateTo: new Date()
            }
        },
    
    }],
    
});