import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NetApiService, NetInterfaces, NetInterface } from '@/net/services/net-api.service';
import { Observable } from 'rxjs';
import { CoreLoadingComponent } from '@/material/components/core-loading/core-loading.component';

interface NetParsed {
  name: string;
  interfaces: NetInterface[];
}


@Component({
  selector: 'app-interfaces',
  standalone: true,
  imports: [],
  templateUrl: './interfaces.component.html',
  styleUrl: './interfaces.component.scss'
})
export class InterfacesComponent {
  title = '';
  nets: NetInterfaces | null = null;
  parsedNets: NetParsed[] | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly netApiService: NetApiService
  ) {
    this.title = this.route.snapshot.data['title'];

    this.netApiService.getInterfaces().subscribe((nets: NetInterfaces | null) => {
      this.nets = nets;
      this.parsedNets = this.getParsedNets(nets);
      console.log(this.nets)
      console.log(this.parsedNets)
    });
  }

  getParsedNets(nets: NetInterfaces | null): NetParsed[] | null  {
    if(!nets) return null;

    let parsed: NetParsed[] = [];
    for(const prop in nets) {
      parsed.push({
        name: prop,
        interfaces: nets[prop]
      })
    }
    return parsed;
  }

}
