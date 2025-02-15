import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CommentsComponent } from './comments.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CommentsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CommentsComponent],
	providers: []
})
export class CommentsModule {}
