import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { CityService } from '../shared/services/dashboard/city.service';
import { DashboardService } from '../shared/services/dashboard/dashboard.service';
import { SellerSalesDc } from './seller-sales-dc';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  subcateid: any;
  CityList: any;
  cityid: any;
  lineChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];
  lineChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  lineChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)'
    }
  ];

  barChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: false
  }];

  barChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  barChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
    }
  ];

  areaChartData = [{
    label: '# of Votes',
    data: [10, 19, 3, 5, 2, 3],
    borderWidth: 1,
    fill: true
  }];

  areaChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  areaChartOptions = {};

  areaChartColors = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,.2)'
    }
  ];


  doughnutPieChartData = [
    {
      data: [30, 40, 30],
    }
  ];

  doughnutPieChartLabels = ["Pink", "Blue", "Yellow"];

  doughnutPieChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  doughnutPieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ]
    }
  ];


  scatterChartData = [
    {
      label: 'First Dataset',
      data: [{
        x: -10,
        y: 0
      },
      {
        x: 0,
        y: 3
      },
      {
        x: -25,
        y: 5
      },
      {
        x: 40,
        y: 5
      }
      ],
      borderWidth: 1
    },
    {
      label: 'Second Dataset',
      data: [{
        x: 10,
        y: 5
      },
      {
        x: 20,
        y: -30
      },
      {
        x: -25,
        y: 15
      },
      {
        x: -10,
        y: 5
      }
      ],
      borderWidth: 1
    }
  ];

  scatterChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  };

  scatterChartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)']
    },
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ]
    }
  ];
  isLoading: boolean;
  DashboardPoStatusCount: any;
  DashboardOrderStatusData: any;
  DashboardOrderFillRate: any;
  DashboardOrderAvgTAT: any;
  DashboardCurrentVsNetCurrent: any;
  SellerSales: SellerSalesDc[];

  CatelogueItemWithCFRChartData: any;
  CatelogueItemWithCFRChartLabels: any;
  CatelogueItemTotalActiveChartData: any;
  CatelogueItemTotalActiveChartLabels: any;
  DashboardCurrentVsNetCurrentChartData: any;
  DashboardCurrentVsNetCurrentLabels: any;

  DashboardOrderStatusDataChartData: any;
  DashboardOrderStatusDataLabels: any;


  SearchData: any;

  constructor(private router: Router, private cityservice: CityService, private dashboardservice: DashboardService) {
    this.SearchData = {};
  }
  ngOnInit() {


    this.subcateid = parseInt(localStorage.getItem('SubCatId'));

    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
    this.SearchData.FromDate = new Date();
    this.SearchData.FromDate = new Date(this.SearchData.FromDate.setHours(0, 0, 0, 0));
    this.SearchData.ToDate = new Date();
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
    });
  }
  Search() {
    this.SearchData.CityId = this.cityid;
    //Catelog
    this.isLoading = true;
    this.dashboardservice.GetCatelogueItemWithCFR(this.cityid).subscribe((x: any) => {
      this.isLoading = false;
      //CatelogueItemTotalActive
      this.CatelogueItemTotalActiveChartData = [
        {
          data: [x.TotalItem, x.Activeitem]
        }
      ];
      this.CatelogueItemTotalActiveChartLabels = ['Total Item', "Active Item"];

      //Fill rate
      this.CatelogueItemWithCFRChartData = [
        {
          data: [x.TotalItem, x.CFRItem]
        }
      ];
      this.CatelogueItemWithCFRChartLabels = ['Total Item', "Active Item"];
    }, error => {
      alert('Something went wrong in Get Catelogue Item With CFR');
    });


    //GetSellerSales
    this.isLoading = true;
    this.dashboardservice.GetSellerSales(this.cityid).subscribe((x: any) => {
      this.isLoading = false;
      this.SellerSales = x
    }, error => {
      alert('Something went wrong in Get Seller Sales');
    });


    //DashboardPoStatusCountDc
    this.isLoading = true;

    this.dashboardservice.GetDashboardPoStatusCount(this.SearchData).subscribe((x: any) => {
      this.isLoading = false;

      this.DashboardPoStatusCount = x
    }, error => {
      alert('Something went wrong in Get Seller Sales');
    });


    //DashboardOrderStatusData
    this.isLoading = true;
    this.dashboardservice.GetDashboardOrderStatusData(this.SearchData).subscribe((x: any) => {
      this.isLoading = false;
      this.DashboardOrderStatusData = x;
      this.DashboardOrderStatusDataChartData = [
        {
          data: [x.PendingOrdercount, x.ReadytoDispatchOrdercount,x.IssuedOrdercount,x.ShippedOrdercount,x.DeliveredOrdercount,x.DeliveryRedispatchOrdercount,x.DeliveryCanceledOrdercount]
        }
      ];
      this.DashboardOrderStatusDataLabels = ['Pending', "RTD",'Issued', "Shipped",'Delivered', "DeliveryRedispatch","DeliveryCanceled"];
    }, error => {
      alert('Something went wrong in Get Dashboard Order Status Data');
    });


    //DashboardOrderFillRate
    this.isLoading = true;
    this.dashboardservice.GetDashboardOrderFillRate(this.SearchData).subscribe((x: any) => {
      this.isLoading = false;
      debugger;
      this.DashboardOrderFillRate = x
    }, error => {
      alert('Something went wrong in Get DashboardOrderFillRate');
    });


    //DashboardOrderAvgTAT
    this.isLoading = true;
    this.dashboardservice.GetDashboardOrderAvgTAT(this.SearchData).subscribe((x: any) => {
      this.isLoading = false;
      debugger;
      this.DashboardOrderAvgTAT = x
    }, error => {
      alert('Something went wrong in Get DashboardOrderAvgTAT');
    });

    //DashboardCurrentVsNetCurrent
    this.isLoading = true;
    this.dashboardservice.GetDashboardCurrentVsNetCurrent(this.SearchData).subscribe((x: any) => {
      this.isLoading = false;

      this.DashboardCurrentVsNetCurrent = x
      //CatelogueItemTotalActive
      this.DashboardCurrentVsNetCurrentChartData = [
        {
          data: [x.CurrentStockAmount, x.CurrentNetStockAmount]
        }
      ];
      this.DashboardCurrentVsNetCurrentLabels = ['CurrentStock', "CurrentNetStock"];


    }, error => {
      alert('Something went wrong in Get DashboardCurrentVsNetCurrent');
    });
  }

}



