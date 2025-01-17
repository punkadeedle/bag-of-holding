import { Button, ButtonProps } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { ModalBody, ModalFooter } from "@chakra-ui/modal";
import React from "react";
import Dialog, { DialogProps } from "./Dialog";

type CustomDialogProps = Omit<DialogProps, "children" | "onClose">;

export interface ConfirmationDialogProps extends CustomDialogProps {
	onConfirm: () => void;
	onCancel: () => void;
	onClose?: () => void;
	confirmLabel?: string;
	cancelLabel?: string;
	confirmProps?: ButtonProps;
	cancelProps?: ButtonProps;
}

/**
 * A dialog for requiring user confirmation before
 * executing an action.
 * Example: Deleting an item should require user
 * confirmation
 *
 * @param {object} props The props
 * @param {Function} props.onConfirm Function to
 * execute if the user clicks the confirm button
 * @param {Function} props.onCancel Function to
 * execute if the user clicks the cancel button
 * @param {string} [props.confirmLabel="Confirm"]
 * The label to use for the confirm button.
 * @param {string} [props.cancelLabel="Cancel"]
 * The label to use for the cancel button.
 * @param {object} [props.confirmProps={}] Props
 * that will be passed to the confirm button
 * @param {object} [props.cancelProps={}] Props
 * that will be passed to the cancel button
 * @param {Function} [props.onClose=props.onCancel]
 * Function to close the dialog. If not provided
 * it is set to be equal to onCancel
 * @param {React.ReactElement} props.children The
 * content to be used in the body of the dialog
 * @returns {React.ReactElement} Rendered stuff
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	onConfirm,
	onCancel,
	onClose = onCancel,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	confirmProps = {},
	cancelProps = {},
	children,
	...props
}) => {
	return (
		<Dialog {...props} onClose={onCancel}>
			<ModalBody>{children}</ModalBody>
			<ModalFooter>
				<Flex justify="space-between" width="full">
					<Button
						colorScheme="error"
						variant="ghost"
						onClick={onCancel}
						{...cancelProps}
					>
						{cancelLabel}
					</Button>
					<Button
						colorScheme={"primary"}
						onClick={() => {
							onConfirm();
							onClose();
						}}
						{...confirmProps}
					>
						{confirmLabel}
					</Button>
				</Flex>
			</ModalFooter>
		</Dialog>
	);
};

export default ConfirmationDialog;
