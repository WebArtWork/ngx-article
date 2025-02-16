import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ArticlesComponent } from './articles.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ArticlesComponent
	},
	{
		path: 'link/:linkId',
		component: ArticlesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ArticlesComponent],
	providers: []
})
export class ArticlesModule {}
