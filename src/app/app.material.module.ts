import { NgModule } from '@angular/core'
import {
  MatCardModule, 
  MatToolbarModule, 
  MatButtonModule, 
  MatCheckboxModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatTooltipModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material'

@NgModule({
  imports: [
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      MatCardModule, 
      MatToolbarModule, 
      MatButtonModule, 
      MatCheckboxModule,
      MatSlideToggleModule, 
      MatChipsModule,
      MatTooltipModule
    ],
  exports: [
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      MatCardModule, 
      MatToolbarModule, 
      MatButtonModule, 
      MatCheckboxModule,
      MatSlideToggleModule,
      MatChipsModule,
      MatTooltipModule
    ],
})
export class AppMaterialModule { }
