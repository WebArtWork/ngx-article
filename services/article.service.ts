import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class ArticleService extends CrudService<Article> {
	constructor() {
		super({
			name: 'article',
		});
	}
}
