import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetApiService, NetInterfaces, NetInterface } from '@/net/services/net-api.service';
import { CoreLoadingComponent } from '@/material/components/core-loading/core-loading.component';

interface NetParsed {
  name: string;
  interfaces: NetInterface[];
}


@Component({
  selector: 'app-interfaces',
  standalone: true,
  imports: [ CoreLoadingComponent ],
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
    });
  }

  getParsedNets(nets: NetInterfaces | null): NetParsed[] | null  {
    if(!nets) return null;

    const parsed: NetParsed[] = [];

    for(const prop in nets) {
      parsed.push({
        name: prop,
        interfaces: nets[prop]
      })
    }

    return parsed;
  }

}
