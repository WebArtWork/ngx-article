import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ArticlesComponent } from './articles.component';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesTemplateComponent } from './articles-template/articles-template.component';
import { ArticlesCreateComponent } from './articles-create/articles-create.component';

const routes: Routes = [
	{
		path: '',
		component: ArticlesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [
		ArticlesComponent,
		ArticlesTemplateComponent,
		ArticlesCreateComponent
	],
	providers: []
})
export class ArticlesModule {}
