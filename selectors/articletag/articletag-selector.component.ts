import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { ArticletagService } from '../../services/articletag.service';
import { Articletag } from '../../interfaces/articletag.interface';

@Component({
	selector: 'articletag-selector',
	templateUrl: './articletag-selector.component.html',
	styleUrls: ['./articletag-selector.component.scss'],
	imports: [SelectModule],
})
export class ArticletagSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Articletag[] {
		return this._articletagService.articletags;
	}

	constructor(private _articletagService: ArticletagService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
