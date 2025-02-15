import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article.interface';

@Component({
	selector: 'article-selector',
	templateUrl: './article-selector.component.html',
	styleUrls: ['./article-selector.component.scss'],
	imports: [SelectModule],
})
export class ArticleSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Article[] {
		return this._articleService.articles;
	}

	constructor(private _articleService: ArticleService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
