import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamModule } from './components/team/team.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FirstComponent } from './components/stage/first/first.component';
import { QuarterfinalsComponent } from './components/stage/quarterfinals/quarterfinals.component';
import { FinalsComponent } from './components/stage/finals/finals.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, FirstComponent, QuarterfinalsComponent, FinalsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TeamModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
