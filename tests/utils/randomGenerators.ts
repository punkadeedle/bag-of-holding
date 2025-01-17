import InventoryItemFields from "../../src/types/InventoryItemFields";
import faker from "faker";
import InventoryMemberFields from "../../src/types/InventoryMemberFields";
import randomItem from "random-item";
import { IdentifiedObject } from "../../src/types/UtilityTypes";

/**
 * A Function type for functions that return randomly
 * generated data entities.
 */
export type RandomEntityGenerator<Entity extends IdentifiedObject> = (
	fields: Partial<Entity>
) => Entity;

/**
 * Randomly generate an inventory item
 *
 * @param {object} [fields={}] An object that can contain
 * any of the fields for inventory items. Any fields that
 * are not provided are randomly generated
 * @param {object[]} [members] Array of inventory members.
 * If provided, the item's `carriedBy` field is set to
 * the `_id` of a member randomly selected from this array.
 * If this is not provided and a `carriedBy` value is not
 * found in `fields`, then carriedBy is set to `Nobody`.
 * @returns {object} Randomly Generated Inventory Item
 */
export const generateRandomInventoryItem: RandomEntityGenerator<InventoryItemFields> = (
	fields = {},
	members?: InventoryMemberFields[]
) => ({
	_id: faker.datatype.uuid(),
	name: faker.commerce.productName(),
	weight: faker.datatype.number(),
	carriedBy: members ? randomItem(members)._id : "Nobody",
	quantity: faker.datatype.number(),
	description: faker.commerce.productDescription(),
	category: faker.commerce.productAdjective(),
	reference: faker.internet.url(),
	value: faker.datatype.number(),
	...fields,
});

/**
 * Randomly generate a party member
 *
 * @param {object} [fields={}] An object that can contain
 * any of the fields for party members. Any fields that
 * are not provided are randomly generated
 * @returns {object} Randomly generated party member
 */
export const generateRandomPartyMember: RandomEntityGenerator<InventoryMemberFields> = (
	fields = {}
) => ({
	_id: faker.datatype.uuid(),
	name: faker.name.firstName(),
	carryCapacity: faker.datatype.number(),
	...fields,
});
