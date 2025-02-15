import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ArticletagService } from '../../services/articletag.service';
import { Articletag } from '../../interfaces/articletag.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { articletagFormComponents } from '../../formcomponents/articletag.formcomponents';

@Component({
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.scss'],
	standalone: false,
})
export class TagsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('articletag', articletagFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Articletag>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Articletag);

					this._articletagService.create(created as Articletag);

					close();
				},
			});
		},
		update: (doc: Articletag): void => {
			this._form
				.modal<Articletag>(this.form, [], doc)
				.then((updated: Articletag) => {
					this._core.copy(updated, doc);

					this._articletagService.update(doc);
				});
		},
		delete: (doc: Articletag): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this articletag?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._articletagService.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Articletag): void => {
					this._form.modalUnique<Articletag>('articletag', 'url', doc);
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

	get rows(): Articletag[] {
		return this._articletagService.articletags;
	}

	constructor(
		private _translate: TranslateService,
		private _articletagService: ArticletagService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Articletag>(create ? [] : this.rows)
				.then((articletags: Articletag[]) => {
					if (create) {
						for (const articletag of articletags) {
							this._preCreate(articletag);

							this._articletagService.create(articletag);
						}
					} else {
						for (const articletag of this.rows) {
							if (
								!articletags.find(
									(localArticletag) => localArticletag._id === articletag._id
								)
							) {
								this._articletagService.delete(articletag);
							}
						}

						for (const articletag of articletags) {
							const localArticletag = this.rows.find(
								(localArticletag) => localArticletag._id === articletag._id
							);

							if (localArticletag) {
								this._core.copy(articletag, localArticletag);

								this._articletagService.update(localArticletag);
							} else {
								this._preCreate(articletag);

								this._articletagService.create(articletag);
							}
						}
					}
				});
		};
	}

	private _preCreate(articletag: Articletag): void {
		delete articletag.__created;
	}
}
