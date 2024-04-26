import { Component } from '@angular/core';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-articles-create',
  templateUrl: './articles-create.component.html',
  styleUrl: './articles-create.component.scss'
})
export class ArticlesCreateComponent {
	constructor(private _as: ArticleService) { }
	chatGPT = `[{name: 'Entity Name'}]`;
	close: () => void;
	entities = '';
	tag: string;
	create() {
		const entities = JSON.parse(this.entities);
		for (const entity of entities) {
			entity.tags = this.tag ? [this.tag] : [];
			this._as.create(entity);
		}
	}
}
