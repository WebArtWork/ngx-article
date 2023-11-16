import { Component } from '@angular/core';
import { FormService } from 'src/app/modules/form/form.service';
import { ArticleService, Article } from 'src/app/modules/article/services/article.service';
import { Router } from '@angular/router';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import { AlertService, CoreService, HttpService } from 'wacom';
import { TranslateService } from 'src/app/modules/translate/translate.service';
import { TagService } from 'src/app/modules/tag/services/tag.service';
import { ArticlesTemplateComponent } from './articles/articles-template/articles-template.component';
import { ModalService } from 'src/app/modules/modal/modal.service';

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
		create:
			this._router.url === '/admin/noveltylinks'
				? null
				: () => {
					this._form
						.modal<Article>(this.form, {
							label: 'Create',
							click: (created: unknown, close: () => void) => {
								(created as Article).isTemplate =
									this._router.url === '/admin/noveltys'
								this._as.create(created as Article);
								close();
							}
						})
						console.log(this._router.url === '/admin/noveltys')
				},
		update:
			this._router.url === '/admin/noveltylinks'
				? null
				: (doc: Article) => {
					this._form
						.modal<Article>(this.form, [], doc)
						.then((updated: Article) => {
							this._core.copy(updated, doc);
							this._as.save(doc);
						});
				},
		delete:
			this._router.url === '/admin/noveltylinks'
				? null
				: (doc: Article) => {
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
				},
		buttons:
			this._router.url === '/admin/noveltylinks'
				? null
				: [
					{
						icon: 'cloud_download',
						click: (doc: Article) => {
							this._form.modalUnique<Article>(
									'article',
									'url',
									doc
								);
						}
					}
				],
		headerButtons:
		this._router.url === '/manage/articles'
		? null
		: [
			{
				text: 'Add from articles',
				click: () => {
					this._modal.show({
						component: ArticlesTemplateComponent,
						class: 'forms_modal'
					});
				}
			}
		]
	};

	links: Article[] = [];

	get rows(): Article[] {
		return this._router.url === '/admin/noveltys'
			? this._as._articles.isTemplate
			: this._router.url === '/admin/noveltylinks' ||
			  this._router.url === '/admin/articles'
			? this.links
			: this._as._articles.isNotTemplate;
	}
	get title(): string {
		if (this._router.url === '/admin/noveltys') {
			return 'Noveltys'
		}

		if (this._router.url === '/admin/noveltylinks') {
			return 'Articles Links'
		}

		return 'Articles';
	}


	constructor(
		private _form: FormService,
		private _as: ArticleService,
		private _alert: AlertService,
		private _translate: TranslateService,
		private _core: CoreService,
		private _router: Router,
		private _modal: ModalService,
		private _http: HttpService,
		private _ts: TagService
	) {
		if (this._router.url === '/admin/noveltylinks') {
			this._http.get('/api/article/getlinks', (links: Article[]) => {
				links.forEach((article: Article) => this.links.push(article));
			});
		} else if (this._router.url === '/admin/articles') {
			this._http.get('/api/article/getadmin', (links: Article[]) => {
				links.forEach((article: Article)=>this.links.push(article));
			});
		}
	}
}

