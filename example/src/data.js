 const data = [
  { id:1,name: 'TONY STARK ', supername: 'Ironman', power: 'Genius' },
  { id:2,name: 'STEVE ROGERS', supername: 'American Cap', power: 'Force' },
  { id:3,name: 'Thor', supername: 'Thor', power: 'God' },
  { id:4,name: 'Thor', supername: 'Thors', power: 'God' },
  { id:5,name: 'Thor', supername: 'Thodrd', power: 'God' },
  { id:6,name: 'Thor', supername: 'asd', power: 'God' },
  { id:7,name: 'Thor', supername: 'asd', power: 'God' },
  { id:8,name: 'Thor', supername: 'asd', power: 'God' },
  { id:9,name: 'Thor', supername: 'asd', power: 'God' },
    { id:10,name: 'TONY STARK ', supername: 'Ironman', power: 'Genius' },
  { id:11,name: 'STEVE ROGERS', supername: 'American Cap', power: 'Force' },
  { id:12,name: 'Thor', supername: 'Thor', power: 'God' },
  { id:13,name: 'Thor', supername: 'Thors', power: 'God' },
  { id:14,name: 'Thor', supername: 'Thodrd', power: 'God' },
]

const superNames =[
  'thor','ironman','balc widow','falcon','cap', 'spiderman'
]

const sl_settings = {
    fieldText: "name",
    filterOptions: [
        {paramName:'name',paramLabel:'Name',},
        {paramName:'supername',paramLabel:'Super Name'},   
    ],
    columnSettings : [
        {header:"Name", columnDef:"name"},
        {header:"Super Name", columnDef:"supername" },
        {header:"Power", columnDef:"power" }                          
    ]
}


export  {data,superNames,sl_settings}