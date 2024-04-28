import { Component } from '@angular/core';
import { FormService } from 'src/app/modules/form/form.service';
import {
	ArticleService,
	Article
} from 'src/app/modules/article/services/article.service';
import { Router } from '@angular/router';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	MongoService,
	StoreService
} from 'wacom';
import { TranslateService } from 'src/app/modules/translate/translate.service';
import { Tag, TagService } from 'src/app/modules/tag/services/tag.service';
import { ArticlesTemplateComponent } from './articles-template/articles-template.component';
import { ModalService } from 'src/app/modules/modal/modal.service';
import {
	Store,
	StoreService as _StoreService
} from 'src/app/modules/store/services/store.service';
import { ArticlesCreateComponent } from './articles-create/articles-create.component';
import { UserService } from 'src/app/core';

@Component({
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
	columns = ['enabled', 'top', 'name', 'short'];

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
				key: 'tags',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill product tag'
					},
					{
						name: 'Label',
						value: 'Tag'
					},
					{
						name: 'Multiple',
						value: true
					},
					{
						name: 'Items',
						value: this._ts.tags
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
						this._form.modal<Article>(
							this.form,
							{
								label: 'Create',
								click: (
									created: unknown,
									close: () => void
								) => {
									(created as Article).isTemplate =
										this._router.url === '/admin/noveltys';
									this._as.create(
										created as Article,
										this.setArticles.bind(this)
									);
									close();
								}
							},
							this.tag ? { tags: [this.tag] } : {}
						);
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
									text: this._translate.translate(
										'Common.Yes'
									),
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
						this._us.role('admin') || this._us.role('agent')
							? {
									icon: 'add_circle',
									click: () => {
										this._modal.show({
											component: ArticlesCreateComponent,
											tag: this.tag
										});
									}
							  }
							: null
						// {
						// 	text: 'Add from articles',
						// 	click: () => {
						// 		this._modal.show({
						// 			component: ArticlesTemplateComponent,
						// 			class: 'forms_modal'
						// 		});
						// 	}
						// }
				  ]
	};

	links: Article[] = [];

	// get rows(): Article[] {
	// 	return this._router.url === '/admin/noveltys'
	// 		? this._as._articles.isTemplate
	// 		: this._router.url === '/admin/noveltylinks' ||
	// 		  this._router.url === '/admin/articles'
	// 		? this.links
	// 		: this._as._articles.isNotTemplate;
	// }
	get title(): string {
		if (this._router.url === '/admin/noveltys') {
			return 'Noveltys';
		}

		if (this._router.url === '/admin/noveltylinks') {
			return 'Articles Links';
		}

		return 'Articles';
	}

	articles: Article[] = [];
	setArticles() {
		this.articles.splice(0, this.articles.length);
		for (const product of this._as.articles) {
			product.tags = product.tags || [];
			if (this.tag) {
				if (product.tags.includes(this.tag)) {
					this.articles.push(product);
				}
			} else {
				this.articles.push(product);
			}
		}
	}

	update(article: Article) {
		this._as.update(article);
	}

	tags: Tag[] = [];
	tagIncludeStore(tag: Tag) {
		if (tag.stores.includes(this.store)) return true;
		while (tag.parent) {
			tag = this._ts.doc(tag.parent);
			if (tag.stores.includes(this.store)) return true;
		}
		return false;
	}
	setTags() {
		this.tags = [];
		for (const tag of this._ts.tags) {
			tag.stores = tag.stores || [];
			if (!this.store || this.tagIncludeStore(tag)) {
				this.tags.push({
					...tag,
					name: this.tagName(tag)
				});
			}
		}
		this.tags.sort((a, b) => {
			if (a.name < b.name) {
				return -1; // a comes first
			} else if (a.name > b.name) {
				return 1; // b comes first
			} else {
				return 0; // no sorting necessary
			}
		});
		this.setArticles();
	}
	tag: string;
	available: string;
	setTag(tagId: string) {
		this._store.set('tag', tagId);
		this.tag = tagId;
		this.available = '';
		if (tagId) {
			let tag = this._ts.doc(tagId);
			while (tag.parent) {
				tag = this._ts.doc(tag.parent);
				this.available += (this.available ? ', ' : '') + tag.name;
			}
		}
		this.setArticles();
	}
	tagName(tag: Tag) {
		let name = tag.name;
		while (tag.parent) {
			tag = this._ts.doc(tag.parent);
			name = tag.name + ' / ' + name;
		}
		return name;
	}

	get stores(): Store[] {
		return this._ss.stores;
	}
	store: string;
	setStore(store: string) {
		this.store = store;
		this._store.set('store', store);
		this.setTags();
	}

	constructor(
		private _form: FormService,
		private _as: ArticleService,
		private _alert: AlertService,
		private _translate: TranslateService,
		private _core: CoreService,
		private _router: Router,
		private _modal: ModalService,
		private _mongo: MongoService,
		private _ss: _StoreService,
		private _store: StoreService,
		private _http: HttpService,
		private _ts: TagService,
		private _us: UserService
	) {
		this._store.get('store', this.setStore.bind(this));
		this._store.get('tag', this.setTag.bind(this));
		this._mongo.on('tag', this.setTags.bind(this));
		this._mongo.on('product', this.setArticles.bind(this));
		if (this._router.url === '/admin/noveltylinks') {
			this._http.get('/api/article/getlinks', (links: Article[]) => {
				links.forEach((article: Article) => this.links.push(article));
			});
		} else if (this._router.url === '/admin/articles') {
			this._http.get('/api/article/getadmin', (links: Article[]) => {
				links.forEach((article: Article) => this.links.push(article));
			});
		}
	}
}
