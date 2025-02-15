import { Injectable } from '@angular/core';
import { Articlecomment } from '../interfaces/articlecomment.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class ArticlecommentService extends CrudService<Articlecomment> {
	constructor() {
		super({
			name: 'articlecomment',
		});
	}
}
