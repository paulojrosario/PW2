import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Importar

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], // Importar RouterLink
  templateUrl: './navbar.html',
  styleUrll: ['./navbar.css']
})    
export class Navbar {}

