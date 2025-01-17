import InventoryItemFields from "./InventoryItemFields";
import InventoryMemberFields from "./InventoryMemberFields";
import { IdentifiedObject } from "./UtilityTypes";

interface InventorySheetFields extends IdentifiedObject {
	name: string;
	items: InventoryItemFields[];
	members: InventoryMemberFields[];
}
//? name max length (max length: 24 chars)

export interface InventorySheetMenuItemFields
	extends Omit<InventorySheetFields, "items"> {
	lastAccessedAt: Date;
}
//? Information about sheet used for the 'recent sheets' feature

export default InventorySheetFields;
