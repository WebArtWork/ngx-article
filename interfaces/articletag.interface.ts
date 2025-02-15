import { CrudDocument } from 'wacom';

export interface Articletag extends CrudDocument {
	name: string;
	description: string;
}
