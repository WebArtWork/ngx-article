import { Component } from '@angular/core';
import { FormService } from 'src/app/modules/form/form.service';
import { ArticleService, Article } from 'src/app/modules/article/services/article.service';
import { Router } from '@angular/router';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/modules/translate/translate.service';
import { TagService } from 'src/app/modules/tag/services/tag.service';

@Component({
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
	columns = ['name', 'short'];

	form: FormInterface = this._form.getForm('article', {
		formId: 'article',
		title: 'Article',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill article title'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Photo',
				key: 'thumb',
				fields: [
					{
						name: 'Label',
						value: 'Header picture'
					}
				]
			},
			{
				name: 'Text',
				key: 'short',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill article short description'
					},
					{
						name: 'Label',
						value: 'Short Description'
					}
				]
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill article description'
					},
					{
						name: 'Label',
						value: 'Description'
					}
				]
			},
			{
				name: 'Text',
				key: 'reference',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill article reference'
					},
					{
						name: 'Label',
						value: 'Reference'
					}
				]
			},
			{
				name: 'Select',
				key: 'tag',
				fields: [
					{
						name: 'Placeholder',
						value: 'Select tag'
					},
					{
						name: 'Items',
						value: this._ts.group('article')
					}
				]
			}
		]
	});

	config = {
		create: () => {
			this._form
				.modal<Article>(this.form, {
					label: 'Create',
					click: (created: unknown, close: () => void) => {
						(created as Article).global = this.global;
						this._as.create(created as Article);
						close();
					}
				})
				.then(this._as.create.bind(this));
		},
		update: (doc: Article) => {
			this._form
				.modal<Article>(this.form, [], doc)
				.then((updated: Article) => {
					this._core.copy(updated, doc);
					this._as.save(doc);
				});
		},
		delete: (doc: Article) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this article?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._as.delete(doc);
						}
					}
				]
			});
		}
	};

	get rows(): Article[] {
		return this.global ? this._as.global : this._as.mine;
	}

	get global(): boolean {
		return this._router.url === '/admin/articles';
	}

	constructor(
		private _form: FormService,
		private _as: ArticleService,
		private _alert: AlertService,
		private _translate: TranslateService,
		private _core: CoreService,
		private _router: Router,
		private _ts: TagService
	) { }
}
