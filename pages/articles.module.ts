import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { ArticlesComponent } from './articles.component';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesTemplateComponent } from './articles/articles-template/articles-template.component';

const routes: Routes = [{
	path: '',
	component: ArticlesComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		ArticlesComponent,
		ArticlesTemplateComponent
	],
	providers: []

})

export class ArticlesModule { }
