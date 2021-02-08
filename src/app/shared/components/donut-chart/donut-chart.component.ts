import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @Input() doughnutPieChartDetails : any;
  @Input() doughnutPieChartLabelsDetails : any;

  doughnutPieChartData = [
    {
      data: [30, 40, 30,40,50,30],
    }
  ];
  doughnutPieChartLabels = ["Pink","Blue","Yellow","Skyblue","Violet","Orange","Red","LightViolet"];

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
        'rgba(255, 99, 132, 0.2)',  //pink
        'rgba(54, 162, 235, 0.2)',//blue
        'rgba(255, 206, 86, 0.2)',//yellow
        'rgba(75, 192, 192, 0.2)',//skyblue
        'rgba(153, 102, 255, 0.2)',//vilolet
        'rgba(255, 159, 64, 0.2)',//orange
        'rgba(251, 24, 10, 0.2)',//Red
        'rgba(247, 5, 244, 0.2)'//LightViolet
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(251, 24, 10, 1)',
        'rgba(247, 5, 244, 1)'

      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
 
    this.doughnutPieChartData =this.doughnutPieChartDetails;
    this.doughnutPieChartLabels =this.doughnutPieChartLabelsDetails;

  }

}
