import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { LoaderComponent } from './loader/loader.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { ShipItemComponent } from './ship-item/ship-item.component';
import { FilterPipe } from './ships/filter.pipe';
import { ShipsComponent } from './ships/ships.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipsComponent,
    ShipDetailComponent,
    LoaderComponent,
    ShipItemComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
