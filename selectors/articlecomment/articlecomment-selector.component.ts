import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ArticlecommentService } from '../../services/articlecomment.service';
import { Articlecomment } from '../../interfaces/articlecomment.interface';

@Component({
	selector: 'articlecomment-selector',
	templateUrl: './articlecomment-selector.component.html',
	styleUrls: ['./articlecomment-selector.component.scss'],
	imports: [SelectModule],
})
export class ArticlecommentSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Articlecomment[] {
		return this._articlecommentService.articlecomments;
	}

	constructor(private _articlecommentService: ArticlecommentService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
