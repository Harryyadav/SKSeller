import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { NgForm } from '@angular/forms';
import { SubcatmappingService } from '../../services/subcatmapping.service';

@Component({
  selector: 'app-subcatselection',
  templateUrl: './subcatselection.component.html',
  styleUrls: ['./subcatselection.component.scss']
})
export class SubcatselectionComponent implements OnInit {
  subcateid: any;
  MappingsubcatList: any;
  userid: any;
  constructor(private SubCatMappingService: SubcatmappingService, private localStorageService: LocalStogareService, private router: Router) { }
  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.subcateid =parseInt(localStorage.getItem('SubCatId'));
    if (this.userid > 0) {
      this.SubCatMappingService.GetAllSubCatMapping().subscribe(result=>{
       this.MappingsubcatList =result;
      })
    }
  }
  SetSubcateId(subcatform:NgForm) {
    if(this.subcateid>0)
    {
    localStorage.setItem('SubCatId', this.subcateid);
    this.router.navigateByUrl('/dashboard');
    }
    else
    {
      alert("Please select subcategory");
    }
  }
}
