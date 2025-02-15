import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TagsComponent } from './tags.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TagsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TagsComponent],
	providers: []
})
export class TagsModule {}
