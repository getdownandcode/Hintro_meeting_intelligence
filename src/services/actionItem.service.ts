import { AppError } from "../middleware/error.middleware";
import * as actionItemRepository from "../repositories/actionItem.repository";
import { ActionItemStatusInput, ListActionItemsQuery } from "../validators/actionItem.validator";

export async function listActionItems(query: ListActionItemsQuery) {
  return actionItemRepository.listActionItems(query);
}

export async function updateStatus(id: string, status: ActionItemStatusInput) {
  try {
    return await actionItemRepository.updateActionItemStatus(id, status);
  } catch {
    throw new AppError("ACTION_ITEM_NOT_FOUND", "Action item was not found", 404);
  }
}

export async function getOverdueActionItems() {
  return actionItemRepository.findOverdueActionItems();
}
