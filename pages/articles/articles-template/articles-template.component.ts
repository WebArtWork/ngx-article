import { Component } from '@angular/core';
import { HttpService } from 'wacom';
import {
    ArticleService,
    Article
} from 'src/app/modules/article/services/article.service';

@Component({
    selector: 'app-articles-template',
    templateUrl: './articles-template.component.html',
    styleUrls: ['./articles-template.component.scss']
})
export class ArticlesTemplateComponent {

    noveltys: any = [];

    constructor(private _http: HttpService, private _as: ArticleService) {
        _http.get('/api/article/getnoveltys', (resp) => {
			this.
                noveltys = resp;
    });
}
create(novelty: Article) {
    novelty = JSON.parse(JSON.stringify(novelty));
    novelty.template = novelty._id as string;
    delete novelty._id;
    novelty.isTemplate = false;
    this._as.create(novelty);
}
}