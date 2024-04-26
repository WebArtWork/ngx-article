import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

export interface Article {
	_id?: string;
	name: string;
	short: string;
	description: string;
	isTemplate: boolean;
	template: string;
	tags: string[];
}

@Injectable({
	providedIn: 'root'
})
export class ArticleService {
	articles: Article[] = [];

	_articles: any = {};

	new(): Article {
		return {} as Article;
	}

	constructor(
		private mongo: MongoService,
		private alert: AlertService
	) {
		this.articles = mongo.get('article', {
			query: {
				isTemplate: (doc: Article) => doc.isTemplate,
				isNotTemplate: (doc: Article) => !doc.isTemplate
			}
		}, (arr: any, obj: any) => {
			this._articles = obj;
		});
	}

	create(
		article: Article = this.new(),
		callback = (created: Article) => {},
		text = 'article has been created.'
	) {
		if (article._id) {
			this.save(article);
		} else {
			this.mongo.create('article', article, (created: Article) => {
				callback(created);
				this.alert.show({ text });
			});
		}
	}

	doc(articleId: string): Article {
		if(!this._articles[articleId]){
			this._articles[articleId] = this.mongo.fetch('article', {
				query: {
					_id: articleId
				}
			});
		}
		return this._articles[articleId];
	}

	update(
		article: Article,
		callback = (created: Article) => {},
		text = 'article has been updated.'
	): void {
		this.mongo.afterWhile(article, ()=> {
			this.save(article, callback, text);
		});
	}

	save(
		article: Article,
		callback = (created: Article) => {},
		text = 'article has been updated.'
	): void {
		this.mongo.update('article', article, () => {
			if(text) this.alert.show({ text, unique: article });
		});
	}

	delete(
		article: Article,
		callback = (created: Article) => {},
		text = 'article has been deleted.'
	): void {
		this.mongo.delete('article', article, () => {
			if(text) this.alert.show({ text });
		});
	}
}
