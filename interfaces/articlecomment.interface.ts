import { CrudDocument } from 'wacom';

export interface Articlecomment extends CrudDocument {
	name: string;
	description: string;
}
