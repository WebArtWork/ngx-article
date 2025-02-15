import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ArticlecommentService } from '../../services/articlecomment.service';
import { Articlecomment } from '../../interfaces/articlecomment.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { articlecommentFormComponents } from '../../formcomponents/articlecomment.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss'],
	standalone: false,
})
export class CommentsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('articlecomment', articlecommentFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._articlecommentService.setPerPage.bind(this._articlecommentService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Articlecomment>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Articlecomment);

					await firstValueFrom(
						this._articlecommentService.create(created as Articlecomment)
					);

					this.setRows();
				},
			});
		},
		update: (doc: Articlecomment): void => {
			this._form
				.modal<Articlecomment>(this.form, [], doc)
				.then((updated: Articlecomment) => {
					this._core.copy(updated, doc);

					this._articlecommentService.update(doc);
				});
		},
		delete: (doc: Articlecomment): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this articlecomment?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._articlecommentService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Articlecomment): void => {
					this._form.modalUnique<Articlecomment>('articlecomment', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
	};

	rows: Articlecomment[] = [];

	constructor(
		private _translate: TranslateService,
		private _articlecommentService: ArticlecommentService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._articlecommentService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Articlecomment>(create ? [] : this.rows)
				.then(async (articlecomments: Articlecomment[]) => {
					if (create) {
						for (const articlecomment of articlecomments) {
							this._preCreate(articlecomment);

							await firstValueFrom(
								this._articlecommentService.create(articlecomment)
							);
						}
					} else {
						for (const articlecomment of this.rows) {
							if (
								!articlecomments.find(
									(localArticlecomment) => localArticlecomment._id === articlecomment._id
								)
							) {
								await firstValueFrom(
									this._articlecommentService.delete(articlecomment)
								);
							}
						}

						for (const articlecomment of articlecomments) {
							const localArticlecomment = this.rows.find(
								(localArticlecomment) => localArticlecomment._id === articlecomment._id
							);

							if (localArticlecomment) {
								this._core.copy(articlecomment, localArticlecomment);

								await firstValueFrom(
									this._articlecommentService.update(localArticlecomment)
								);
							} else {
								this._preCreate(articlecomment);

								await firstValueFrom(
									this._articlecommentService.create(articlecomment)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(articlecomment: Articlecomment): void {
		delete articlecomment.__created;
	}
}
