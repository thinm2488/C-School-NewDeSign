import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { TranscriptService } from 'app/service/transcript.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  danhsachkhoi = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  khoilop
  loaiKha:number=0;
  loaiGioi:number=0;
  loaiTB:number=0;
  loaiKem:number=0;
  loaiYeu:number=0;
  constructor(private api: TranscriptService) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  layketqua(khoi) {
    let data = {
      khoi: khoi
    }
    this.api.getstatistic(data).subscribe(res => {
      let kha=0;
      let gioi=0;
      let tb=0;
      let yeu=0;
      let kem=0
      console.log(res)
      let data=Object.assign(res)
      let transcript=data.transcript.transcript
      transcript.forEach(element => {
        if(element.xepLoai=="Giỏi"){
         gioi=gioi+1
        } 
        else if(element.xepLoai=="Khá"){
          kha=kha+1
         
        }
        else if(element.xepLoai=="Trung Bình"){
          tb=tb+1
        }
        else if(element.xepLoai=="Yếu"){
         yeu=yeu+1
        }
        else{
         kem=kem+1
        }
      });
      this.loaiGioi=gioi;
      this.loaiKha=kha;
      this.loaiTB=tb;
      this.loaiYeu=yeu;
      this.loaiKem=kem
      this.initchart()

    })
  }
  ngOnInit() {
    this.khoilop = "1"
    this.layketqua(this.khoilop)
    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    this.initchart()
  

  }
initchart(){
  var datawebsiteViewsChart = {
    labels: ['Giỏi', 'Khá', 'Trung Bình', 'Yếu', 'Kém'],
    series: [
      [this.loaiGioi, this.loaiKha, this.loaiTB, this.loaiYeu, this.loaiKem]

    ]
  };
  var optionswebsiteViewsChart = {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 500,
    chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
  var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

  //start animation for the Emails Subscription Chart
  this.startAnimationForBarChart(websiteViewsChart);
}

}
