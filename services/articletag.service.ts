import { Injectable } from '@angular/core';
import { Articletag } from '../interfaces/articletag.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class ArticletagService extends CrudService<Articletag> {
	articletags: Articletag[] = this.getDocs();

	articletagsByAuthor: Record<string, Articletag[]> = {};

	constructor() {
		super({
			name: 'articletag',
		});

		this.get();

		this.filteredDocuments(this.articletagsByAuthor);
	}
}
