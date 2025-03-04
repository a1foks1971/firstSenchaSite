Ext.define('NewExtApp.view.main.Main', {
    xtype: 'cell-editing',
    extend: 'Ext.Panel',
    width: 650,
    height: 500,
    addConfig: function(){},
    setFlex: function () {},
  
  requires: [
  'Ext.chart.CartesianChart',
  'Ext.chart.axis.Numeric',
  'Ext.chart.axis.Category',
  'Ext.chart.series.Bar'
  ],
  
  items: {
  xtype: 'cartesian',
  width: 600,
  height: 400,
  title: 'Monthly Expenses',
  store: {
      model: 'Sales',
      data: [
          { month: 'January', sales: 100 },
          { month: 'February', sales: 200 },
          { month: 'March', sales: 150 }
      ]
  },
  
  // Define the axes for x and y
  axes: [
      {
          type: 'numeric',
          position: 'left',
          title: {
              text: 'Values',
              fontSize: 15
          },
          fields: ['data1'],  // Maps to store field for y-axis
          minimum: 0,
          grid: true
      },
      {
          type: 'category',
          position: 'bottom',
          title: {
              text: 'Month',
              fontSize: 15
          },
          fields: ['month'],  // Maps to store field for x-axis
          label: {
              rotate: {
                  degrees: -45
              }
          }
      }
  ],
  
  // Define the series (bars in this case)
  series: [
      {
          type: 'bar',
          xField: 'month',  // X-axis data field
          yField: 'sales',  // Y-axis data field
          style: {
              fill: '#a2b5ca'
          },
          highlight: {
              fillStyle: '#1d82b5',
              strokeStyle: '#3c3c3c',
              lineWidth: 2
          },
      }
  ]
  
  }
  
  });
  
  Ext.define('Sales', function () {
  return {
  extend: 'Ext.data.Model',
  idProperty:'_id',
  fields: ['month', 'sales']
  };
  });