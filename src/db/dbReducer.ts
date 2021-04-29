import mapObject from "map-obj";
import omit from "omit.js";
import { InventorySheetPartialUpdateAction } from "../types/InventorySheetState";
import getIds from "../utils/getIds";
import SheetModel from "./SheetModel";

/**
 * Reducer for controlling database
 *
 * @param {string} sheetId The id of the sheet to
 * update
 * @param {object} action The action used to update
 * the sheet
 */
const dbReducer = async (
	sheetId: string,
	action: InventorySheetPartialUpdateAction
): Promise<void> => {
	const metaUpdates = {
		$inc: { __v: 1 },
	};

	/**
	 * Execute a provided update on the target sheet in
	 * mongodb
	 *
	 * @param {object} operation The mongoose operation to
	 * execute upon the sheet document
	 * @param {object} [additionalQuery] Additional object that
	 * is merged to the query object. Used to be able to make
	 * use of the mongoose '$' index operator.
	 */
	const updateSheet = (
		operation: Record<string, unknown>,
		additionalQuery: Record<string, unknown> = {}
	) => {
		SheetModel.updateOne({ _id: sheetId, ...additionalQuery } as unknown, {
			...operation,
			...metaUpdates,
		}).exec();
	};
	switch (action.type) {
		case "item_add":
			updateSheet({ $push: { items: action.data } });
			break;
		case "item_remove":
			updateSheet({ $pull: { items: { _id: action.data } } });
			break;
		case "item_update":
			updateSheet(
				{
					$set: mapObject(
						omit(action.data, ["_id"]),
						//? Data without the '_id' field (because we don't want to update the _id
						(key: string, value: string | number) => [`items.$.${key}`, value]
						//? Generate a valid mongoose update from the action data
					),
				},
				{ "items._id": action.data._id }
			);
			break;
		case "sheet_metadataUpdate":
			if (action.data.name) {
				updateSheet({
					$set: {
						name: action.data.name,
						// members: action.data.members.map((name) => generateMember(name)),
						//? We have to write an arrow function because if we just pass the function then the index gets passed as the carry capacity
					},
				});
			}
			if (action.data.members.add.length) {
				updateSheet({
					$push: {
						members: {
							$each: action.data.members.add,
						},
					},
				});
			}
			if (action.data.members.remove.length) {
				updateSheet({
					$pull: {
						members: {
							_id: {
								$in: getIds(action.data.members.remove),
							},
						},
					},
				});
			}
			if (action.data.members.update.length) {
				action.data.members.update.forEach((updatedMember) => {
					updateSheet(
						{
							$set: {
								"members.$.name": updatedMember.name,
								"members.$.carryCapacity": updatedMember.carryCapacity,
							},
						},
						{ "members._id": updatedMember._id }
					);
				});
			}
			break;
	}
};

export default dbReducer;
